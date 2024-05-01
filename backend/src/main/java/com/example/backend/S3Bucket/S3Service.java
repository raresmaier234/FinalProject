package com.example.backend.S3Bucket;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Service
public class S3Service implements FileService {

    @Autowired
    private AmazonS3Client amazonS3Client;

    @Override
    public List<String> getPhotoUrlsForRent(Long rentId) {
        String bucketName = "traveler-store"; // Your S3 bucket name
        String prefix = "rents/" + rentId + "/"; // Assuming photos are stored under a 'rents' directory with rent ID subdirectories

        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName(bucketName)
                .withPrefix(prefix);

        List<String> photoUrls = new ArrayList<>();

        ListObjectsV2Result result;
        do {
            result = amazonS3Client.listObjectsV2(request);

            for (S3ObjectSummary objectSummary : result.getObjectSummaries()) {
                String photoUrl = amazonS3Client.getUrl(bucketName, objectSummary.getKey()).toString();
                photoUrls.add(photoUrl);
            }

            request.setContinuationToken(result.getNextContinuationToken());
        } while (result.isTruncated());

        return photoUrls;
    }
    @Override
    public List<String> uploadFiles(List<MultipartFile> files) {
        List<String> uploadedUrls = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                String key = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

                ObjectMetadata metaData = new ObjectMetadata();
                metaData.setContentLength(file.getSize());
                metaData.setContentType(file.getContentType());

                amazonS3Client.putObject("traveler-store", key, file.getInputStream(), metaData);
                amazonS3Client.setObjectAcl("traveler-store", key, CannedAccessControlList.PublicRead);

                String url = amazonS3Client.getResourceUrl("traveler-store", key);
                uploadedUrls.add(url);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while uploading files");
        }

        return uploadedUrls;
    }
    }


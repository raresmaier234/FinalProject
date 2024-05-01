package com.example.backend.S3Bucket;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    List<String> getPhotoUrlsForRent(Long rentId);

    List<String> uploadFiles(List<MultipartFile> files);
}


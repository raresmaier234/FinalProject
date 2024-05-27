package com.example.backend.components.rent.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.backend.S3Bucket.FileService;
import com.example.backend.components.rent.model.*;
import com.example.backend.components.rent.service.RentService;
import com.example.backend.components.reviews.service.ReviewService;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class RentController {

    @Autowired
    private RentService rentService;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewService reviewService;


    @GetMapping("/getAllRents")
    public List<RentDTO> getAllRents() {
        List<Rent> rents = rentService.getAll();
        return rents.stream().map(rent -> {
            Double averageRating = reviewService.getAverageRating(rent.getId());
            return new RentDTO(
                    rent.getId(),
                    rent.getName(),
                    rent.getDescription(),
                    rent.getPrice(),
                    rent.getLocation(),
                    rent.getType(),
                    averageRating,
                    rent.getPhotoUrls(),
                    rent.getNrOfPersons(),
                    rent.getNrOfRooms(),
                    rent.getNrOfBathrooms()
            );
        }).collect(Collectors.toList());
    }
    @PostMapping("/getAvailableRents")
    public List<Rent> getAllAvailableRents(@RequestBody(required = false) RentFilter filter) {
        return rentService.getAvailableRents(filter);
    }

    @PostMapping("/addRent")
    public ResponseEntity<Rent> addRent(@RequestParam("user_id") Long userId,
                                        @RequestParam("location") String location,
                                        @RequestParam("price") int price,
                                        @RequestParam("name") String name,
                                        @RequestParam("description") String description,
                                        @RequestParam("nrOfBathrooms") int nrOfBathrooms,
                                        @RequestParam("nrOfPersons") int nrOfPersons,
                                        @RequestParam("nrOfRooms") int nrOfRooms,
                                        @RequestParam("hasParking") Boolean hasParking,
                                        @RequestParam("startDate") LocalDate startDate,
                                        @RequestParam("endDate") LocalDate endDate,
                                        @RequestParam("type") String type,
                                        @RequestPart("photos") List<MultipartFile> photos) {

        List<String> publicURL = fileService.uploadFiles(photos);
        Rent rent = new Rent();
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        rent.setUser(user);
        rent.setPhotoUrls(publicURL);
        rent.setEndDate(endDate);
        rent.setStartDate(startDate);
        rent.setHasParking(hasParking);
        rent.setNrOfRooms(nrOfRooms);
        rent.setNrOfPersons(nrOfPersons);
        rent.setNrOfBathrooms(nrOfBathrooms);
        rent.setDescription(description);
        rent.setName(name);
        rent.setRentStatus(RentStatus.Available);
        rent.setPrice(price);
        rent.setLocation(location);
        rent.setType(RentType.valueOf(type));
        return new ResponseEntity<>(rentService.addRent(rent), HttpStatus.CREATED);
    }
    @GetMapping("/getRent/{id}")
    public Optional<Rent> getRent(
            @PathVariable Long id
    ){
        return rentService.getRent(id);
    }

    @PostMapping("/editRent/{id}")
    public Rent editRent(
            @PathVariable Long id,
            @RequestBody Rent rent
    ) {
        rent.setId(id);
        return rentService.updateRent(rent);
    }

    @PostMapping("/deleteRent/{id}")
    public void deleteRent(
            @PathVariable Long id
    ) {
        rentService.deleteRent(id);
    }
}
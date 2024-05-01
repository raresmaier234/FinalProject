package com.example.backend.components.rent.controller;

import com.example.backend.S3Bucket.FileService;
import com.example.backend.S3Bucket.S3Service;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.model.RentFilter;
import com.example.backend.components.rent.service.RentService;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class RentController {

    @Autowired
    private RentService rentService;

    @Autowired
    private FileService fileService;

    @GetMapping("/getAllRents")
    public List<Rent> getAllRents() {
        return rentService.getAll();
    }

    @GetMapping("/getAvailableRents")
    public List<Rent> getAllAvailableRents(@RequestBody(required = false) RentFilter filter) {
        return rentService.getAvailableRents(filter);
    }

    @PostMapping("/addRent")
    public ResponseEntity<Rent> addRent(@RequestParam("location") String location,
                                        @RequestParam("price") int price,
                                        @RequestParam("name") String name,
                                        @RequestParam("description") String description,
                                        @RequestParam("nrOfBathrooms") int nrOfBathrooms,
                                        @RequestParam("nrOfPersons") int nrOfPersons,
                                        @RequestParam("nrOfRooms") int nrOfRooms,
                                        @RequestParam("hasParking") Boolean hasParking,
                                        @RequestParam("startDate") LocalDate startDate,
                                        @RequestParam("endDate") LocalDate endDate,
                                        @RequestPart("photos") List<MultipartFile> photos) {

        List<String> publicURL = fileService.uploadFiles(photos);
        Rent rent = new Rent();
        rent.setPhotoUrls(publicURL);
        rent.setEndDate(endDate);
        rent.setStartDate(startDate);
        rent.setHasParking(hasParking);
        rent.setNrOfRooms(nrOfRooms);
        rent.setNrOfPersons(nrOfPersons);
        rent.setNrOfBathrooms(nrOfBathrooms);
        rent.setDescription(description);
        rent.setName(name);
        rent.setPrice(price);
        rent.setLocation(location);
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
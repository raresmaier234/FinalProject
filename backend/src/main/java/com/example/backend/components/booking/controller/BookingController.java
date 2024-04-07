package com.example.backend.components.booking.controller;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/getBookings")
    List<Booking> getAssociations() {
        return bookingRepository.findAll();
    }

}
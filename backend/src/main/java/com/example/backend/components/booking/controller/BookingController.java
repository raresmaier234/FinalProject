package com.example.backend.components.booking.controller;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/availableDates")
    List<LocalDate> getAvailableDates(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return bookingService.findAvailableDates(startDate, endDate);
    }


    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.addBooking(booking);
    }

}
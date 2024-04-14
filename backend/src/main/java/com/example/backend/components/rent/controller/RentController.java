package com.example.backend.components.rent.controller;

import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.model.RentFilter;
import com.example.backend.components.rent.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import java.util.List;

@RestController
public class RentController {

    @Autowired
    private RentService rentService;

    @GetMapping("/availableRents")
    public List<Rent> getAvailableRents(
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(required = false) BookingStatus bookingStatus,
            @RequestParam(required = false) String location
    ) {
        RentFilter filter = new RentFilter(startDate, endDate, bookingStatus, location);
        filter.setStartDate(startDate);
        filter.setEndDate(endDate);
        filter.setBookingStatus(bookingStatus);
        filter.setLocation(location);
        return rentService.getAvailableRents(filter);
    }
}
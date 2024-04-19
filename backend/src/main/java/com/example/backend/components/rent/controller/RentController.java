package com.example.backend.components.rent.controller;

import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.model.RentFilter;
import com.example.backend.components.rent.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RentController {

    @Autowired
    private RentService rentService;

    @GetMapping("/getAllRents")
    public List<Rent> getAllRents() {
        return rentService.getAll();
    }

    @GetMapping("/getAvailableRents")
    public List<Rent> getAllAvailableRents(@RequestBody(required = false) RentFilter filter) {
        return rentService.getAvailableRents(filter);
    }


    @PostMapping("/addRent")
    public Rent addRent(
            @RequestBody Rent rent
    ) {
        return rentService.addRent(rent);
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
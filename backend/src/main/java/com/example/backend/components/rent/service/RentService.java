package com.example.backend.components.rent.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.backend.components.rent.model.RentFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;

@Service
public class RentService {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Rent> getAvailableRents(RentFilter filter) {
        List<Rent> allRents = rentRepository.findAll();

        // Filter rents based on booking status
        List<Long> rentIdsWithApprovedBookings = bookingRepository.findByBookingStatus(filter.getBookingStatus())
                .stream()
                .map(Booking::getRent)
                .map(Rent::getId)
                .toList();

        // Filter rents based on location
        List<Long> rentIdsWithMatchingLocation = allRents.stream()
                .filter(rent -> rent.getLocation().equals(filter.getLocation()))
                .map(Rent::getId)
                .toList();

        // Filter rents based on bookings' start and end dates
        List<Long> rentIdsWithNoBookings = bookingRepository.findAll()
                .stream()
                .filter(booking -> booking.getStartDate().compareTo(filter.getEndDate()) <= 0 && booking.getEndDate().compareTo(filter.getStartDate()) >= 0)
                .map(Booking::getRent)
                .map(Rent::getId)
                .toList();

        // Filter the available rents based on booking status, location, and date range
        return allRents.stream()
                .filter(rent -> !rentIdsWithApprovedBookings.contains(rent.getId()) || !rentIdsWithNoBookings.contains(rent.getId()) || rentIdsWithMatchingLocation.contains(rent.getId()))
                .collect(Collectors.toList());
    }
}

package com.example.backend.components.booking.service;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RentRepository rentRepository;

    public Booking addBooking(Booking booking){

        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.getReferenceById(id);
    }

    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsForUserRents(Long userId) {
        List<Rent> rents = rentRepository.findByUserId(userId);
        List<Booking> bookings = new ArrayList<>();
        for (Rent rent : rents) {
            bookings.addAll(bookingRepository.findByRentId(rent.getId()));
        }
        return bookings;
    }

    public List<Booking> getBookingsByClient(Long clientId) {
        return bookingRepository.findByUserId(clientId);
    }

}

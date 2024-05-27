package com.example.backend.components.booking.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.model.BookingRequest;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.booking.service.BookingService;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RentRepository rentRepository;

    @GetMapping("/availableDates")
    List<LocalDate> getAvailableDates(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return bookingService.findAvailableDates(startDate, endDate);
    }

    @PostMapping("/addBooking")
    public Booking createBooking(@RequestBody BookingRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new NotFoundException("User not found"));
        Rent rent = rentRepository.findById(request.getRentId()).orElseThrow(() -> new NotFoundException("Rent not found"));

        Booking booking = new Booking(user, rent, request.getNrOfRooms(), request.getNrOfPersons(), request.getStartDate(), request.getEndDate(), BookingStatus.valueOf(request.getBookingStatus()), request.getTotalPrice());

        return bookingService.addBooking(booking);
    }

    @PostMapping("/{bookingId}/updateBookingStatus")
    public Booking editBookingStatus(@PathVariable Long bookingId, @RequestParam("bookingStatus") String bookingStatus) {
        Booking booking = bookingService.getBookingById(bookingId);
        booking.setBookingStatus(BookingStatus.valueOf(bookingStatus));
        return bookingService.updateBooking(booking);
    }

    @GetMapping("/{userId}/bookings")
    public List<Booking> getBookingsForUserRents(
            @PathVariable Long userId)
    {
        return bookingService.getBookingsForUserRents(userId);
    }
    @GetMapping("/client/{userId}/bookings")
    public List<Booking> getBookingsForClients(
            @PathVariable Long userId)
    {
        return bookingService.getBookingsByClient(userId);
    }

}

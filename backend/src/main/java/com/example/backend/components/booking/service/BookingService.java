package com.example.backend.components.booking.service;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.booking.repository.BookingRepository;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;
import com.example.backend.components.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RentRepository rentRepository;

    public List<LocalDate> findAvailableDates(LocalDate startDate, LocalDate endDate) {
        List<Booking> existingBookings = bookingRepository.findByStartDateBetween(startDate, endDate);
        List<LocalDate> allDates = generateDateRange(startDate, endDate);

        for (Booking booking : existingBookings) {
            removeDates(allDates, booking.getStartDate(), booking.getEndDate());
        }

        return allDates;
    }

    private List<LocalDate> generateDateRange(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> datesInRange = new ArrayList<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            datesInRange.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        return datesInRange;
    }

    private void removeDates(List<LocalDate> dates, LocalDate startDate, LocalDate endDate) {
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            dates.remove(currentDate);
            currentDate = currentDate.plusDays(1);
        }
    }

    public Booking addBooking(Booking booking){

        return bookingRepository.save(booking);
    }

    public List<Booking> getPendingBookings(User user) {
        return bookingRepository.findBookingByUser(user);
    }

    public List<Booking> getBookingsForUserRents(Long userId) {
        List<Rent> rents = rentRepository.findByUserId(userId);
        List<Booking> bookings = new ArrayList<>();
        for (Rent rent : rents) {
            bookings.addAll(bookingRepository.findByRentId(rent.getId()));
        }
        return bookings;
    }

}

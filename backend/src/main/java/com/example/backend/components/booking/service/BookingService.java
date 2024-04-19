package com.example.backend.components.booking.service;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
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
}

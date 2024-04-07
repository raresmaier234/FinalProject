package com.example.backend.components.booking.service;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Date> findAvailableDates(Date startDate, Date endDate) {
        List<Booking> existingBookings = bookingRepository.findByStartDateBetween(startDate, endDate);
        List<Date> allDates = generateDateRange(startDate, endDate);

        for (Booking booking : existingBookings) {
            removeDates(allDates, booking.getStartDate(), booking.getEndDate());
        }

        return allDates;
    }

    private List<Date> generateDateRange(Date startDate, Date endDate) {
        List<Date> datesInRange = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        while (calendar.getTime().before(endDate) || calendar.getTime().equals(endDate)) {
            datesInRange.add(calendar.getTime());
            calendar.add(Calendar.DATE, 1);
        }

        return datesInRange;
    }

    private void removeDates(List<Date> dates, Date startDate, Date endDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        while (calendar.getTime().before(endDate) || calendar.getTime().equals(endDate)) {
            dates.remove(calendar.getTime());
            calendar.add(Calendar.DATE, 1);
        }
    }
}

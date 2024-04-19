package com.example.backend.components.rent.model;

import com.example.backend.components.booking.model.BookingStatus;

import java.time.LocalDate;
import java.util.Date;

public class RentFilter {
    private LocalDate startDate;
    private LocalDate endDate;
    private BookingStatus bookingStatus;
    private String location;

    public RentFilter(LocalDate startDate, LocalDate endDate, BookingStatus bookingStatus, String location) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
        this.location = location;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

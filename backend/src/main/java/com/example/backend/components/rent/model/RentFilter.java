package com.example.backend.components.rent.model;

import com.example.backend.components.booking.model.BookingStatus;

import java.util.Date;

public class RentFilter {
    private Date startDate;
    private Date endDate;
    private BookingStatus bookingStatus;
    private String location;

    public RentFilter(Date startDate, Date endDate, BookingStatus bookingStatus, String location) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
        this.location = location;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
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

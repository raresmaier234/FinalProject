package com.example.backend.components.booking.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class BookingRequest {
    private Long rentId;
    private Long userId;
    private int nrOfRooms;
    private int nrOfPersons;
    private LocalDate startDate;
    private LocalDate endDate;
    private String bookingStatus;
    private int totalPrice;

    public BookingRequest() {
    }

    public BookingRequest(Long rentId, Long userId, int nrOfRooms, int nrOfPersons, LocalDate startDate, LocalDate endDate, String bookingStatus, int totalPrice) {
        this.rentId = rentId;
        this.userId = userId;
        this.nrOfRooms = nrOfRooms;
        this.nrOfPersons = nrOfPersons;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
        this.totalPrice = totalPrice;
    }

    public Long getRentId() {
        return rentId;
    }

    public void setRentId(Long rentId) {
        this.rentId = rentId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getNrOfRooms() {
        return nrOfRooms;
    }

    public void setNrOfRooms(int nrOfRooms) {
        this.nrOfRooms = nrOfRooms;
    }

    public int getNrOfPersons() {
        return nrOfPersons;
    }

    public void setNrOfPersons(int nrOfPersons) {
        this.nrOfPersons = nrOfPersons;
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

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}

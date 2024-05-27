package com.example.backend.components.booking.model;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Booking", schema = "public")
public class Booking {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "rent_id")
    private Rent rent;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "booking_status", nullable = false)
    private BookingStatus bookingStatus;

    private int totalPrice;
    private int nrOfRooms;
    private int nrOfPersons;

    public Booking(User user, Rent rent, int nrOfRooms, int nrOfPersons, LocalDate startDate, LocalDate endDate, BookingStatus bookingStatus, int totalPrice) {
        this.user = user;
        this.rent = rent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
        this.totalPrice = totalPrice;
        this.nrOfRooms = nrOfRooms;
        this.nrOfPersons = nrOfPersons;
    }

    public Booking() {

    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
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

    public Rent getRent() {
        return rent;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
}


package com.example.backend.components.booking.model;

import com.example.backend.components.comment.model.Comment;
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

    public Booking(User user, Rent rent, LocalDate startDate, LocalDate endDate,  BookingStatus bookingStatus) {
        this.user = user;
        this.rent = rent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
    }

    public Booking() {

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


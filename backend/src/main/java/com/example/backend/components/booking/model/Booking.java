package com.example.backend.components.trip.model;

import com.example.backend.components.user.model.User;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="Booking", schema = "public")
public class Trip {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String photos;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    private String name;
    private String location;

    @Column(name = "booking_status", nullable = false)
    private BookingStatus bookingStatus;

}


package com.example.backend.components.booking.repository;

import com.example.backend.components.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStartDateBetween(Date startDate, Date endDate);
}

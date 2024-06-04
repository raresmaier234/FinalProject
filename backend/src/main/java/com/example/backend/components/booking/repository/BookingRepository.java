package com.example.backend.components.booking.repository;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByBookingStatus(BookingStatus bookingStatus);
    List<Booking> findByRentId(Long rentId);
    List<Booking> findByUserId(Long userId);
}

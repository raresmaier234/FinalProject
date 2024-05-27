package com.example.backend.components.booking.repository;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
    List<Booking> findByBookingStatus(BookingStatus bookingStatus);
    List<Booking> findBookingByUser(User user);
    List<Booking> findByRentId(Long rentId);
}

package com.example.backend.components.rent.repository;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.rent.model.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface RentRepository extends JpaRepository<Rent, Long> {
}

package com.example.backend.components.reviews.repository;

import com.example.backend.components.reviews.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRentId(Long rentId);
}

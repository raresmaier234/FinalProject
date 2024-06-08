package com.example.backend.components.reviews.repository;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.reviews.model.Review;
import com.example.backend.components.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRentId(Long rentId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.rent.id = :rentId")
    Double findAverageRatingByRentId(Long rentId);

    Optional<Review> findByRentAndUser(Rent rent, User user);
}

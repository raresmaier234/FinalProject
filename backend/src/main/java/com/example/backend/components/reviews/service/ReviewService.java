package com.example.backend.components.reviews.service;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.reviews.model.Review;
import com.example.backend.components.reviews.repository.ReviewRepository;
import com.example.backend.components.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public Optional<Review> findReviewByRentAndUser(Rent rent, User user) {
        return reviewRepository.findByRentAndUser(rent, user);
    }
    public List<Review> getAll(Long rentId) {
        return reviewRepository.findByRentId(rentId);
    }

    public Double getAverageRating(Long rentId) {
        return reviewRepository.findAverageRatingByRentId(rentId);
    }

}
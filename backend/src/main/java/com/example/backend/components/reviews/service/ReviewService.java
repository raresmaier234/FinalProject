package com.example.backend.components.reviews.service;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.reviews.model.Review;
import com.example.backend.components.reviews.repository.ReviewRepository;
import com.example.backend.components.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional
    public Review saveReview(Long rentId, Long userId, String reviewText, double rating) {
        Review review = new Review();
        review.setText(reviewText);
        review.setRating(rating);
        review.setRent(new Rent(rentId));
        review.setUser(new User(userId));
        return reviewRepository.save(review);
    }

    public List<Review> getAll(Long rentId) {
        return reviewRepository.findByRentId(rentId);
    }

}
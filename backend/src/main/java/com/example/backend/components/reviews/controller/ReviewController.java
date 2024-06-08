package com.example.backend.components.reviews.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;
import com.example.backend.components.reviews.model.Review;
import com.example.backend.components.reviews.repository.ReviewRepository;
import com.example.backend.components.reviews.service.ReviewService;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rents/{rentId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RentRepository rentRepository;


    @PostMapping
    public ResponseEntity<?> createOrUpdateReview(@PathVariable Long rentId, @RequestBody Review reviewRequest) {
        User user = userRepository.findById(reviewRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Rent rent = rentRepository.findById(rentId)
                .orElseThrow(() -> new RuntimeException("Rent not found"));

        Optional<Review> existingReview = reviewService.findReviewByRentAndUser(rent, user);

        Review review;
        if (existingReview.isPresent()) {
            review = existingReview.get();
            review.setText(reviewRequest.getText());
            review.setRating(reviewRequest.getRating());
        } else {
            review = new Review(reviewRequest.getText(), reviewRequest.getRating(), rent, user);
        }

        review = reviewService.saveReview(review);
        return ResponseEntity.ok(review);
    }

    @GetMapping
    public List<Review> getAllReviews(@PathVariable Long rentId) {
        return reviewService.getAll(rentId);
    }

}
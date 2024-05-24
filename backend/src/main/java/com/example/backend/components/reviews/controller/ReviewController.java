package com.example.backend.components.reviews.controller;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.reviews.model.Review;
import com.example.backend.components.reviews.service.ReviewService;
import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rents/{rentId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createReview(@PathVariable Long rentId, @RequestBody Review reviewRequest) {
        User user = userRepository.findByEmail(reviewRequest.getUser().getEmail());
        Review review = reviewService.saveReview(rentId, user.getId(), reviewRequest.getText(), reviewRequest.getRating());
        return ResponseEntity.ok(review);
    }

    @GetMapping
    public List<Review> getAllReviews(@PathVariable Long rentId) {
        return reviewService.getAll(rentId);
    }

}
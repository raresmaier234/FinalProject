package com.example.backend.components.reviews.model;

import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.user.model.User;
import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private double rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rent_id", nullable = false)
    private Rent rent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Review(Long id, String text, double rating, Rent rent, User user) {
        this.id = id;
        this.text = text;
        this.rating = rating;
        this.rent = rent;
        this.user = user;
    }

    public Review(String text, double rating, Rent rent, User user) {
        this.text = text;
        this.rating = rating;
        this.rent = rent;
        this.user = user;
    }

    public Review() {
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Rent getRent() {
        return rent;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }
}

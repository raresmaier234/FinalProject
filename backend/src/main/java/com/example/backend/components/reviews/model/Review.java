package com.example.backend.components.reviews;

import com.example.backend.components.rent.model.Rent;
import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_id", nullable = false)
    private Rent rent;

    public Review(Long id, String text, Rent rent) {
        this.id = id;
        this.text = text;
        this.rent = rent;
    }

    public Review(String text, Rent rent) {
        this.text = text;
        this.rent = rent;
    }

    public Review() {
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

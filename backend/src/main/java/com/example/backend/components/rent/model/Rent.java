package com.example.backend.components.rent.model;

import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Rent", schema = "public")
public class Rent {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    private String name;
    private int price;
    private Rating rating;
    private String description;
    @ElementCollection
    @CollectionTable(name = "RentPhotos", joinColumns = @JoinColumn(name = "rent_id"))
    @Column(name = "photo_url")
    private List<String> photos;
    private String location;
    private RentStatus rentStatus;
    private LocalDate startDate;
    private LocalDate endDate;

    public Rent() {

    }

    public Rent(String name, int price, String location, String description, List<String> photos, LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.price = price;
        this.photos = photos;
        this.location = location;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Rent(long id, String name, int price, Rating rating, List<String> photos, String location, RentStatus rentStatus,
    LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.photos = photos;
        this.location = location;
        this.rentStatus = rentStatus;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    public List<String> getPhotos() {
        return photos;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public RentStatus getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(RentStatus rentStatus) {
        this.rentStatus = rentStatus;
    }
}

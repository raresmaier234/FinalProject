package com.example.backend.components.booking.model;

import com.example.backend.components.comment.model.Comment;
import com.example.backend.components.user.model.User;
import jakarta.persistence.*;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Booking", schema = "public")
public class Booking {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String photos;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    private String name;
    private String location;

    @Column(name = "booking_status", nullable = false)
    private BookingStatus bookingStatus;

    private int price;
    private String rating;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Booking(User user, String photos, Date startDate, Date endDate, String name, String location, BookingStatus bookingStatus, int price, String rating, List<Comment> comments) {
        this.user = user;
        this.photos = photos;
        this.startDate = startDate;
        this.endDate = endDate;
        this.name = name;
        this.location = location;
        this.bookingStatus = bookingStatus;
        this.price = price;
        this.rating = rating;
        this.comments = comments;
    }

    public Booking() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BookingStatus getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(BookingStatus bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}


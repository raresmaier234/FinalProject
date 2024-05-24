package com.example.backend.components.rent.model;

import com.example.backend.components.user.model.User;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="Rent", schema = "public")
public class Rent {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private int price;
    private Rating rating;
    private String description;

    @Transient // Not persisted in the database
    private List<MultipartFile> photos;

    @ElementCollection
    @CollectionTable(name = "RentPhotos", joinColumns = @JoinColumn(name = "rent_id"))
    @Column(name = "photo_url")
    private List<String> photoUrls;

    private String location;
    private RentStatus rentStatus;
    private LocalDate startDate;
    private LocalDate endDate;

    @Column(nullable = true)
    private int nrOfRooms;

    @Column(nullable = true)
    private int nrOfPersons;

    @Column(nullable = true)
    private int nrOfBathrooms;

    @Column(nullable = true)
    private boolean hasParking;

    private RentType type;

    public Rent() {

    }

    public Rent(long id, User user, String name, int price, Rating rating, String description, List<MultipartFile> photos, List<String> photoUrls, String location, RentStatus rentStatus, LocalDate startDate, LocalDate endDate, int nrOfRooms, int nrOfPersons, int nrOfBathrooms, boolean hasParking, RentType type) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.photos = photos;
        this.photoUrls = photoUrls;
        this.location = location;
        this.rentStatus = rentStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nrOfRooms = nrOfRooms;
        this.nrOfPersons = nrOfPersons;
        this.nrOfBathrooms = nrOfBathrooms;
        this.hasParking = hasParking;
        this.type = type;
    }

    public Rent(User user, String name, int price, Rating rating, String description, List<MultipartFile> photos, List<String> photoUrls, String location, RentStatus rentStatus, LocalDate startDate, LocalDate endDate, int nrOfRooms, int nrOfPersons, int nrOfBathrooms, boolean hasParking, RentType type) {
        this.user = user;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.photos = photos;
        this.photoUrls = photoUrls;
        this.location = location;
        this.rentStatus = rentStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.nrOfRooms = nrOfRooms;
        this.nrOfPersons = nrOfPersons;
        this.nrOfBathrooms = nrOfBathrooms;
        this.hasParking = hasParking;
        this.type = type;
    }

    public Rent(Long rentId) {
        this.id = rentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public RentType getType() {
        return type;
    }

    public void setType(RentType type) {
        this.type = type;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<MultipartFile> getPhotos() {
        return photos;
    }

    public void setPhotos(List<MultipartFile> photos) {
        this.photos = photos;
    }

    public List<String> getPhotoUrls() {
        return photoUrls;
    }

    public void setPhotoUrls(List<String> photoUrls) {
        this.photoUrls = photoUrls;
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

    public int getNrOfRooms() {
        return nrOfRooms;
    }

    public void setNrOfRooms(int nrOfRooms) {
        this.nrOfRooms = nrOfRooms;
    }

    public int getNrOfPersons() {
        return nrOfPersons;
    }

    public void setNrOfPersons(int nrOfPersons) {
        this.nrOfPersons = nrOfPersons;
    }

    public int getNrOfBathrooms() {
        return nrOfBathrooms;
    }

    public void setNrOfBathrooms(int nrOfBathrooms) {
        this.nrOfBathrooms = nrOfBathrooms;
    }

    public boolean isHasParking() {
        return hasParking;
    }

    public void setHasParking(boolean hasParking) {
        this.hasParking = hasParking;
    }
}
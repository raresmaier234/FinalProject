package com.example.backend.components.rent.model;

import jakarta.persistence.Transient;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class RentDTO {
    private Long id;
    private String name;
    private String description;
    private int price;
    private String location;
    private RentType type;
    private Double averageRating;

    private List<String> photos;
    private int nrOfRooms;
    private int nrOfBathrooms;
    private int nrOfPersons;

    public RentDTO() {
    }

    public RentDTO(Long id, String name, String description, int price, String location, RentType type, Double averageRating, List<String> photos, int nrOfPersons, int nrOfRooms, int nrOfBathrooms) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.location = location;
        this.nrOfPersons = nrOfPersons;
        this.nrOfRooms = nrOfRooms;
        this.nrOfBathrooms = nrOfBathrooms;
        this.type = type;
        this.averageRating = averageRating;
        this.photos = photos;
    }

    public RentDTO(String name, String description, int price, String location, RentType type, Double averageRating, List<String> photos, int nrOfPersons, int nrOfRooms, int nrOfBathrooms) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.location = location;
        this.nrOfPersons = nrOfPersons;
        this.nrOfRooms = nrOfRooms;
        this.nrOfBathrooms = nrOfBathrooms;
        this.type = type;
        this.averageRating = averageRating;
        this.photos = photos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getNrOfRooms() {
        return nrOfRooms;
    }

    public void setNrOfRooms(int nrOfRooms) {
        this.nrOfRooms = nrOfRooms;
    }

    public int getNrOfBathrooms() {
        return nrOfBathrooms;
    }

    public void setNrOfBathrooms(int nrOfBathrooms) {
        this.nrOfBathrooms = nrOfBathrooms;
    }

    public int getNrOfPersons() {
        return nrOfPersons;
    }

    public void setNrOfPersons(int nrOfPersons) {
        this.nrOfPersons = nrOfPersons;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public RentType getType() {
        return type;
    }

    public void setType(RentType type) {
        this.type = type;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }
}

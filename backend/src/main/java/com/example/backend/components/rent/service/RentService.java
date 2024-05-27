package com.example.backend.components.rent.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.example.backend.S3Bucket.S3Service;
import com.example.backend.components.rent.model.RentFilter;
import com.example.backend.components.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.components.booking.model.BookingStatus;
import com.example.backend.components.booking.model.Booking;
import com.example.backend.components.booking.repository.BookingRepository;
import com.example.backend.components.rent.model.Rent;
import com.example.backend.components.rent.repository.RentRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RentService {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private S3Service s3Service;

    public List<Rent> getAll() {
        return rentRepository.findAll();
    }

    public Optional<Rent> getRent(Long id) { return rentRepository.findById(id); }

    public List<Rent> getAvailableRents(RentFilter rentFilter) {
        List<Rent> allRents = getAll();

        List<Long> rentIdsWithApprovedBookings = bookingRepository.findByBookingStatus(BookingStatus.CONFIRMED)
                .stream()
                .map(Booking::getRent)
                .map(Rent::getId)
                .toList();

        List<Rent> availableRents = allRents.stream()
                .filter(rent -> !rentIdsWithApprovedBookings.contains(rent.getId()))
                .collect(Collectors.toList());

        if (rentFilter.getLocation() != null) {
            availableRents = availableRents.stream()
                    .filter(rent -> rent.getLocation().equals(rentFilter.getLocation()))
                    .collect(Collectors.toList());
        }

        if (rentFilter.getStartDate() != null && rentFilter.getEndDate() != null) {
            List<Long> rentIdsWithNoBookings = bookingRepository.findAll()
                    .stream()
                    .filter(booking -> booking.getStartDate().compareTo(rentFilter.getEndDate()) <= 0 &&
                            booking.getEndDate().compareTo(rentFilter.getStartDate()) >= 0)
                    .map(Booking::getRent)
                    .map(Rent::getId)
                    .toList();

            availableRents = availableRents.stream()
                    .filter(rent -> !rentIdsWithNoBookings.contains(rent.getId()))
                    .collect(Collectors.toList());
        }

        if (rentFilter.getNrOfPersons() > 0) {
            availableRents = availableRents.stream()
                    .filter(rent -> rent.getNrOfPersons() >= rentFilter.getNrOfPersons())
                    .collect(Collectors.toList());
        }

        if (rentFilter.getNrOfRooms() > 0) {
            availableRents = availableRents.stream()
                    .filter(rent -> rent.getNrOfRooms() >= rentFilter.getNrOfRooms())
                    .collect(Collectors.toList());
        }

        return availableRents;
    }


    public Rent addRent(Rent rent){
        return rentRepository.save(rent);
    }
    public Rent updateRent(Rent rent) {
        Optional<Rent> existingRentOptional = rentRepository.findById(rent.getId());

        if (existingRentOptional.isPresent()) {
            Rent existingRent = existingRentOptional.get();
            existingRent.setLocation(rent.getLocation());
            existingRent.setPrice(rent.getPrice());

            return rentRepository.save(existingRent);
        } else {
            throw new RuntimeException("Rent not found with ID: " + rent.getId());
        }
    }

    public void deleteRent(long rent) {
        rentRepository.deleteById(rent);
    }
}

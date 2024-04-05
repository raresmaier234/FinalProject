package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getClient")
    List<User> getAssociations() {
        return userRepository.findAll();
    }


    public User getClientByCredentials(String email, String password) {
        List<User> listAssociation = userRepository.findAll();
        for (User v : listAssociation)
            if (v.getEmail().equals(email) && v.getPassword().equals(password)) return v;
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAssociation(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String firstName = credentials.get("firstName");
        String lastName = credentials.get("lastName");

        // Check if email already exists
        Optional<User> existingClient = userRepository.findByEmail(email);
        if (existingClient.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // If email does not exist, proceed with registration
        User user = new User(firstName, lastName, email, password);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }


    @PostMapping("/login")
    public ResponseEntity<User> logIn(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = getClientByCredentials(email, password);

        if (user != null) {
            return ResponseEntity.ok(userRepository.findById(user.getId()).orElse(null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
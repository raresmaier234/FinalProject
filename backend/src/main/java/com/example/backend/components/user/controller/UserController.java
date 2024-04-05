package com.example.backend.components.user.controller;

import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

}
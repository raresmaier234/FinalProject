package com.example.backend.components.register.controller;

import com.example.backend.components.register.service.RegistrationService;
import com.example.backend.components.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        registrationService.registerUser(user);
        return ResponseEntity.ok().build();
    }
}


package com.example.backend.components.register.service;

import com.example.backend.components.user.model.User;
import com.example.backend.components.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        newUser.setPassword(hashedPassword);
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPhone(user.getPhone());
        newUser.setRole(user.getRole());
        userRepository.save(newUser);
    }

    public boolean verifyLogin(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }
}
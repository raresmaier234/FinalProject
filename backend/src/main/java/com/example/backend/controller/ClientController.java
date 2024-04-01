package com.example.backend.controller;

import com.example.backend.model.Client;
import com.example.backend.repository.ClientRepository;

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
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/getClient")
    List<Client> getAssociations() {
        return clientRepository.findAll();
    }


    public Client getClientByCredentials(String email, String password) {
        List<Client> listAssociation = clientRepository.findAll();
        for (Client v : listAssociation)
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
        Optional<Client> existingClient = clientRepository.findByEmail(email);
        if (existingClient.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // If email does not exist, proceed with registration
        Client client = new Client(firstName, lastName, email, password);
        clientRepository.save(client);
        return ResponseEntity.ok(client);
    }


    @PostMapping("/login")
    public ResponseEntity<Client> logIn(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Client client = getClientByCredentials(email, password);

        if (client != null) {
            return ResponseEntity.ok(clientRepository.findById(client.getId()).orElse(null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
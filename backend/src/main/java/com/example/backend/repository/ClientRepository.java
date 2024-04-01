package com.example.backend.repository;
import com.example.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long>{
    Optional<Client> findByEmail(String email);
}

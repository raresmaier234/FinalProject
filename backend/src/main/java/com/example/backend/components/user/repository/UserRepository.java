package com.example.backend.components.user.repository;

import com.example.backend.components.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByPassword(String password);
}

package com.example.backend.components.user.model;

import jakarta.persistence.*;

@Entity
@Table(name="USER", schema = "public")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private String email;
    private String phone;
    private String firstName;
    private String password;
    private String lastName;
    private UserRole role;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User() {
    }

    public User(long id, String email, String phone, String firstName, String password, String lastName, UserRole role) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
        this.role = role;
    }

    public User(long id) {
        this.id = id;
    }

    public User(String email, String phone, String firstName, String password, String lastName, UserRole role) {
        this.email = email;
        this.phone = phone;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User(String firstName, String lastName, String email, String password, UserRole role) {
        this.email = email;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
        this.role = role;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}

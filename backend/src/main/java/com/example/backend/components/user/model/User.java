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
    private long phone;
    private String firstName;
    private String password;
    private String lastName;

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

    public User(long id, String email, long phone, String firstName, String password, String lastName) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
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

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public User(String firstName, String lastName, String email, String password) {
        this.email = email;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}

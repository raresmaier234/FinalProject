package com.example.backend.model;

import jakarta.persistence.*;
@Entity
public class Client {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private String email;

    public Client(String email, String password) {
        this.email = email;
        this.password = password;
    }

    private String phone;
    private String firstName;
    private String password;
    private String lastName;

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

    public Client() {
    }

    public Client(long id, String email, String phone, String firstName, String password, String lastName) {
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Client(String firstName, String lastName, String email, String password) {
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

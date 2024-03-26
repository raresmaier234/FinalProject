package com.example.backend.model;

import jakarta.persistence.*;
@Entity
public class Client {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private String email;
    private String phone;
    private String userName;
    private String password;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Client() {
    }

    public Client(String email, String phone, String userName, String password, String name) {
        this.email = email;
        this.phone = phone;
        this.userName = userName;
        this.password = password;
        this.name = name;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}

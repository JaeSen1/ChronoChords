package com.chronochords.backend.Entity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User {
    @Id
    @Column(name = "user_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "token_expiry_date")
    private LocalDateTime tokenExpiryDate;

    @Column(name = "username", length = 255, nullable = false, unique = true)
    private String username;
    @Column(name = "email", length = 255, nullable = false, unique = true)
    private String email;
    @Column(name = "password", length = 255, nullable = false)
    private String password;
    @Column(name = "description", length = 255)
    private String description;
    @Column(name = "status", length = 30)
    private String status;
    @Column(name = "avatar_url")
    private String avatarUrl;

    public User() {
    }

    public User(int userid, String username, String email, String password) {
        this.userid = userid;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setResetPasswordToken(String token) {
        this.resetPasswordToken = token;
    }

    public void setTokenExpiryDate(LocalDateTime localDateTime) {
        this.tokenExpiryDate = localDateTime;
    }

    public LocalDateTime getTokenExpiryDate() {
        return this.tokenExpiryDate;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
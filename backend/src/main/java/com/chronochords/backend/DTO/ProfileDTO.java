package com.chronochords.backend.DTO;

public class ProfileDTO {
    private String username;
    private String description;
    private String status;

    public ProfileDTO() {
    }

    public ProfileDTO(String username, String description, String status, String img) {
        this.username = username;
        this.description = description;
        this.status = status;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
}

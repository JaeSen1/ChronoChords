package com.chronochords.chronochordsuserservice.payload.response;

public class LoginMessage {
    String message;
    Boolean status;
    String username;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    public LoginMessage(String message, Boolean status, String username) {
        this.message = message;
        this.status = status;
        this.username = username;
    }
}

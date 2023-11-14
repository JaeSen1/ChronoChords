package com.chronochords.backend.payload.response;

public class LoginMessage {
    String message;
    Boolean status;
    String username;
    String userTokenId;
    int userId;

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

    public String getUserTokenId() {
        return userTokenId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUserTokenId(String userTokenId) {
        this.userTokenId = userTokenId;
    }

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    public LoginMessage(String message, Boolean status, String username, int userTokenId) {
        this.message = message;
        this.status = status;
        this.username = username;
        this.userId = userTokenId;
    }
}

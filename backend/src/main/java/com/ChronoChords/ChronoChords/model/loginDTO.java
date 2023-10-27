package com.ChronoChords.ChronoChords.model;

public class loginDTO {
    private String email;
    private String password;
    public loginDTO() {
    }

    public loginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}

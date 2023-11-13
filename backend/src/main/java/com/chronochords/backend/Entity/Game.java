package com.chronochords.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String token;
    public Game() {

    }
    public Game(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public String getToken(){
        return this.token;
    }

    public void setToken(String token){
        this.token = token;
    }

}
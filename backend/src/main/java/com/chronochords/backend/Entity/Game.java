package com.chronochords.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int[] guessScores = new int[20]; // to store scores for each guess
    private int totalScore;
    private int guessesCount;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String token;

    public Game() {

    }
    public Game(User user, String token) {
        this.user = user;
        this.token = token;
    }
    public void addGuessScore(int score) {
        if (guessesCount < guessScores.length) {
            guessScores[guessesCount++] = score;
            totalScore += score;
        }
    }

    public int getTotalScore() {
        return totalScore;
    }

    public int[] getGuessScores() {
        return guessScores;
    }

    public void setGuessScores(int[] guessScores) {
        this.guessScores = guessScores;
    }

    public String getToken(){
        return this.token;
    }

    public void setToken(String token){
        this.token = token;
    }

}
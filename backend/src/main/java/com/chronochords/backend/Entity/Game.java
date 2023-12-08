package com.chronochords.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int[] guessScores = new int[50]; // to store scores for each guess
    private int totalScore;
    private String gameMode;
    private int guessesCount = 1;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public String getGameMode() {
        return gameMode;
    }
    public int getGuessesCount() {
        return guessesCount;
    }
    public void setGameMode(String gameMode) {
        this.gameMode = gameMode;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGuessesCount(int guessesCount) {
        this.guessesCount = guessesCount;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
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
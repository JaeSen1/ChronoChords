package com.chronochords.backend.Service.impl;

import com.chronochords.backend.Entity.Game;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Repository.GameRepo;
import com.chronochords.backend.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameServiceIMPL implements GameService {
    @Autowired
    private GameRepo gameSessionRepository;

    /**
     * Generates a gameToken and passes it to the frontend.
     * @param user
     * @return
     */
    public String startNewGame(User user) {
        String gameToken = UUID.randomUUID().toString();
        Game session = new Game(user, gameToken);
        gameSessionRepository.save(session);
        return gameToken;
    }
    // In GameServiceIMPL.java
    public Game findGameByUserId(Integer userId) {
        return gameSessionRepository.findByUser_UseridAndTokenIsNotNull(userId);
    }
    public String startNewGame(User user, String gameMode) {
        String gameToken = UUID.randomUUID().toString();
        Game session = new Game(user, gameToken);
        session.setGameMode(gameMode);
        gameSessionRepository.save(session);
        return gameToken;
    }

    public Game findGameByUserIdAndGameMode(Integer userId, String gameMode) {
        return gameSessionRepository.findByUser_UseridAndGameModeAndTokenIsNotNull(userId, gameMode);
    }
    @Override
    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        Game game = gameSessionRepository.findByToken(token);
        if (game == null) {
            return false;
        } else {
            return true;
        }
    }
    public void addGuessScore(String token, int score) {
        Game game = gameSessionRepository.findByToken(token);
        if (game != null) {
            game.addGuessScore(score);
            gameSessionRepository.save(game);
        }
    }

    public GameRepo getGameSessionRepository() {
        return gameSessionRepository;
    }

    public void setGameSessionRepository(GameRepo gameSessionRepository) {
        this.gameSessionRepository = gameSessionRepository;
    }

    // Method to fetch the current game state
    public Game getCurrentGameState(String token) {
        return gameSessionRepository.findByToken(token);
    }

    /**
     * Nullifies gameToken so game cannot be reentered.
     * @param gameToken
     */
    public void endGame(String gameToken) {
        Game session = gameSessionRepository.findByToken(gameToken);
        if (session != null) {
            session.setToken(null); // Nullify the token
            gameSessionRepository.save(session); // Save the updated session
        }
    }
}
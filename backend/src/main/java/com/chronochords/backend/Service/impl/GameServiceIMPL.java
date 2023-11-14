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

    /**
     * Nullifies gameToken so game cannot be reentered.
     * @param gameToken
     */
    public void endGame(String gameToken) {
        Game session = gameSessionRepository.findByToken(gameToken);
        if (session != null) {
            gameSessionRepository.delete(session); // End the game session
        }
    }
}
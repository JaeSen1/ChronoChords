package com.chronochords.backend.Service;

import com.chronochords.backend.Entity.User;

public interface GameService {
    String startNewGame(User user);
    void endGame(String gameToken);

    boolean validateToken(String token);

    void addGuessScore(String token, int score);
}

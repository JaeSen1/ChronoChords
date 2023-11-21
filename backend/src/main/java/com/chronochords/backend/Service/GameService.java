package com.chronochords.backend.Service;

import com.chronochords.backend.Entity.Game;
import com.chronochords.backend.Entity.User;

public interface GameService {
    String startNewGame(User user, String gamemode);
    void endGame(String gameToken);

    boolean validateToken(String token);

    void addGuessScore(String token, int score);

    Game findGameByUserId(Integer userId);

    Game findGameByUserIdAndGameMode(Integer userId, String gameMode);
}

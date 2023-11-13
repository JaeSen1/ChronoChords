package com.chronochords.backend.Service;

import com.chronochords.backend.Entity.User;

public interface GameService {
    String startNewGame(User user);
    void endGame(String gameToken);
}

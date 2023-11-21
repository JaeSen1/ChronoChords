package com.chronochords.backend.Repository;

import com.chronochords.backend.Entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

// In GameRepo.java
public interface GameRepo extends JpaRepository<Game, Integer> {
    Game findByToken(String token);
    Game findByUser_UseridAndTokenIsNotNull(Integer userId);
    Game findByUser_UseridAndGameModeAndTokenIsNotNull(Integer userId, String gameMode);
}

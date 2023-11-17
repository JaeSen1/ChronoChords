package com.chronochords.backend.Repository;

import com.chronochords.backend.Entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepo extends JpaRepository<Game, Integer > {
    Game findByToken(String token);

}

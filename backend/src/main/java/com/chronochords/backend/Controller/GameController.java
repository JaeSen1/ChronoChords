package com.chronochords.backend.Controller;
import com.chronochords.backend.Entity.Game;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Repository.GameRepo;
import com.chronochords.backend.Repository.UserRepo;
import com.chronochords.backend.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private GameRepo GameRepo;

    @Autowired
    private UserRepo userRepo;  // Inject the User repository

    @PostMapping("/start/{userId}/{gameMode}")
    public ResponseEntity<?> startGame(@PathVariable String userId, @PathVariable String gameMode) {
        User user = userRepo.findById(Long.valueOf(userId)).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        String token = gameService.startNewGame(user, gameMode);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/check-game/{userId}/{gameMode}")
    public ResponseEntity<?> checkForExistingGame(@PathVariable Integer userId, @PathVariable String gameMode) {
        Game existingGame = gameService.findGameByUserIdAndGameMode(userId, gameMode);
        if (existingGame != null) {
            Map<String, Object> gameInfo = new HashMap<>();
            gameInfo.put("token", existingGame.getToken());
            gameInfo.put("totalScore", existingGame.getTotalScore());
            gameInfo.put("round", existingGame.getGuessesCount());
            gameInfo.put("guessScores", existingGame.getGuessScores());
            return ResponseEntity.ok(gameInfo);
        } else {
            return ResponseEntity.ok().body("No active game found for user in this mode");
        }
    }

    public static class ScoreWrapper {
        private int score;
        public ScoreWrapper() {}
        public int getScore() {
            return score;
        }
        public void setScore(int score) {
            this.score = score;
        }
    }

    @PostMapping("/score/{token}")
    public ResponseEntity<?> addScore(@PathVariable String token, @RequestBody ScoreWrapper scoreWrapper) {
        try {
            gameService.addGuessScore(token, scoreWrapper.getScore());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding score");
        }
    }

    @GetMapping("/check-game/{userId}")
    public ResponseEntity<?> checkForExistingGame(@PathVariable Integer userId) {
        Game existingGame = gameService.findGameByUserId(userId);
        if (existingGame != null ) {
            return ResponseEntity.ok(existingGame.getToken());
        } else {
            return ResponseEntity.ok().body("No active game found for user");
        }
    }

    @GetMapping("/validate-token/{token}")
    public ResponseEntity<?> validateToken(@PathVariable String token) {
        boolean isValid = gameService.validateToken(token); // Implement this method in your GameService
        if (isValid) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }

    @PostMapping("/end")
    public ResponseEntity<?> endGame(@RequestParam String token) {
        gameService.endGame(token);
        return ResponseEntity.ok().build();
    }
}


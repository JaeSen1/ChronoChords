package com.chronochords.backend.Controller;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Repository.GameRepo;
import com.chronochords.backend.Repository.UserRepo;
import com.chronochords.backend.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/start/{userId}")
    public ResponseEntity<?> startGame(@PathVariable String userId) {
        User user = userRepo.findById(Long.valueOf(userId)).orElse(null);  // Fetch the user from the database
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        String token = gameService.startNewGame(user);
        return ResponseEntity.ok(token);
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


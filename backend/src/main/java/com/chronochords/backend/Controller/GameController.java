package com.chronochords.backend.Controller;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Repository.UserRepo;
import com.chronochords.backend.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/game")
public class GameController {
    @Autowired
    private GameService gameService;

    @Autowired
    private UserRepo userRepo;  // Inject the User repository

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestParam("userid") Long userId) {
        User user = userRepo.findById(userId).orElse(null);  // Fetch the user from the database
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        String token = gameService.startNewGame(user);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/end")
    public ResponseEntity<?> endGame(@RequestParam String token) {
        gameService.endGame(token);
        return ResponseEntity.ok().build();
    }
}


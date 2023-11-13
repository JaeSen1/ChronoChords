package com.chronochords.backend.Controller;
import com.chronochords.backend.DTO.UserDTO;
import com.chronochords.backend.DTO.LoginDTO;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Repository.UserRepo;
import com.chronochords.backend.Service.UserService;
import com.chronochords.backend.Service.impl.EmailServiceIMPL;
import com.chronochords.backend.payload.response.LoginMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailServiceIMPL emailServiceIMPL;

    @Autowired
    private UserRepo UserRepo;
    @GetMapping("/validate-reset-token")
    public ResponseEntity<?> validateResetToken(@RequestParam("token") String token) {
        boolean isValid = userService.isResetTokenValid(token);
        if (!isValid) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
        return ResponseEntity.ok("Token is valid.");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                           @RequestParam("newPassword") String newPassword) {
        User user = userService.getUserByPasswordResetToken(token);
        if (user == null || user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        userService.changeUserPassword(user, newPassword);
        return ResponseEntity.ok("Password updated successfully.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        User user = UserRepo.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User does not exist with this email.");
        }

        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);
        emailServiceIMPL.sendPasswordResetEmail(user, token);

        return ResponseEntity.ok("Password reset link sent.");
    }

    @PostMapping(path = "/save")
    public String saveUser(@Valid @RequestBody UserDTO userDTO)
    {
        String id = userService.addUser(userDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginMessage loginMessage = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginMessage);
    }
}

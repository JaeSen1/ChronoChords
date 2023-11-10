package com.chronochords.backend.Service.impl;

import com.chronochords.backend.DTO.UserDTO;
import com.chronochords.backend.DTO.LoginDTO;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Exception.CustomException;
import com.chronochords.backend.Repository.UserRepo;
import com.chronochords.backend.Service.UserService;
import com.chronochords.backend.payload.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class UserIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String addUser(UserDTO userDTO) {

        Map<String, String> errors = new LinkedHashMap<>();

        // Check if email already exists
        if (userRepo.existsByEmail(userDTO.getEmail())) {
            errors.put("email", "Email is already in use");
        }

        // Check if the username already exists
        if (userRepo.existsByUsername(userDTO.getUsername())) {
            errors.put("username", "Username is already taken");
        }

        // If there are any errors, throw an exception with all errors.
        if (!errors.isEmpty()) {
            throw new CustomException(errors, HttpStatus.BAD_REQUEST);
        }

        // If both checks pass, proceed with registration
        User user = new User(
                userDTO.getUserid(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())
        );
        userRepo.save(user);
        return user.getUsername();
    }
    public void createPasswordResetTokenForUser(User user, String token) {
        user.setResetPasswordToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(1)); // Token expires in 1 hour
        userRepo.save(user);
    }

    public User getUserByPasswordResetToken(String token) {
        return userRepo.findByResetPasswordToken(token);
    }

    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setTokenExpiryDate(null);
        userRepo.save(user);
    }
    @Override
    public LoginMessage loginUser(LoginDTO loginDTO) {
        User user1 = userRepo.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                return new LoginMessage("Login Success", true, user1.getUsername());
            } else {
                return new LoginMessage("Password does not match", false);
            }
        } else {
            return new LoginMessage("Email does not exist", false);
        }
    }
}

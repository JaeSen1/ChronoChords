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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class UserServiceIMPL implements UserService {
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
    public boolean isResetTokenValid(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }

        User user = userRepo.findByResetPasswordToken(token);
        if (user == null) {
            return false;
        }
        LocalDateTime tokenExpiryDate = user.getTokenExpiryDate();
        return tokenExpiryDate != null && tokenExpiryDate.isAfter(LocalDateTime.now());
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
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                return new LoginMessage("Login Success", true, user1.getUsername(), user1.getUserid());
            } else {
                return new LoginMessage("Password does not match", false);
            }
        } else {
            return new LoginMessage("Email does not exist", false);
        }
    }

    @Override
    public ProfileDTO getUserProfile(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        // Convert the User entity into a ProfileDTO and return
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setUsername(user.getUsername());
        profileDTO.setDescription(user.getDescription());
        profileDTO.setStatus(user.getStatus());

        return profileDTO;
    }

    @Override
    public void updateUserProfile(Long userId, ProfileDTO profileDTO) {
        User user = userRepo.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        // Convert the User entity into a ProfileDTO and return
        user.setDescription(profileDTO.getDescription());
        user.setStatus(profileDTO.getStatus());

        userRepo.save(user);
    }
}
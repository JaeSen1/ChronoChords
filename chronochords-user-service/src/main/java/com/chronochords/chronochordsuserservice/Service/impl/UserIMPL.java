package com.chronochords.chronochordsuserservice.Service.impl;

import com.chronochords.chronochordsuserservice.DTO.UserDTO;
import com.chronochords.chronochordsuserservice.DTO.LoginDTO;
import com.chronochords.chronochordsuserservice.Entity.User;
import com.chronochords.chronochordsuserservice.Exception.CustomException;
import com.chronochords.chronochordsuserservice.Repository.UserRepo;
import com.chronochords.chronochordsuserservice.Service.UserService;
import com.chronochords.chronochordsuserservice.payload.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String addUser(UserDTO userDTO) {
        // Check if email already exists
        if (userRepo.existsByEmail(userDTO.getEmail())) {
            throw new CustomException("Email already in use", HttpStatus.BAD_REQUEST);
        }

        // Check if the username already exists
        if (userRepo.existsByUsername(userDTO.getUsername())) {
            throw new CustomException("Username already taken", HttpStatus.BAD_REQUEST);
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
    @Override
    public LoginMessage  loginUser(LoginDTO loginDTO) {
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

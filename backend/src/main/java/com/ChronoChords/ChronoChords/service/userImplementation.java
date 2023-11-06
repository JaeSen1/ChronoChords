package com.ChronoChords.ChronoChords.service;

import com.ChronoChords.ChronoChords.model.User;
import com.ChronoChords.ChronoChords.model.loginDTO;
import com.ChronoChords.ChronoChords.model.loginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ChronoChords.ChronoChords.repository.userRepository;

import javax.annotation.Resource;
import java.util.Optional;

@Service

public class userImplementation implements userService {
    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(User user) {

        User newUser = new User(
            user.getId(),
            user.getEmail(),
            this.passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(newUser);
        return newUser.getEmail();
    }
    User user;

    @Override
    public loginResponse loginUser(loginDTO loginDTO) {
        String msg = "";
        User user1 = userRepository.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new loginResponse("Login Success", true);
                } else {
                    return new loginResponse("Login Failed", false);
                }
            } else {
                return new loginResponse("password Not Match" +" " + encodedPassword + " " + password, false);
            }
        }else {
            return new loginResponse("Email not exits" , false);
        }
    }
}


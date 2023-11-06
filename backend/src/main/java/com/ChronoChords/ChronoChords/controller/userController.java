package com.ChronoChords.ChronoChords.controller;

import com.ChronoChords.ChronoChords.model.User;
import com.ChronoChords.ChronoChords.model.loginDTO;
import com.ChronoChords.ChronoChords.model.loginResponse;
import com.ChronoChords.ChronoChords.service.userService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
@RestController
@RequestMapping("/api/registration")
public class userController {
    @Autowired
    private userService userService;
    @PostMapping(path = "/save")
    public String saveEmployee(@RequestBody User user)
    {
        String id = userService.addUser(user);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody loginDTO loginDTO)
    {
        loginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}


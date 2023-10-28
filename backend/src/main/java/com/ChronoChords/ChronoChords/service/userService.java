package com.ChronoChords.ChronoChords.service;
import com.ChronoChords.ChronoChords.model.loginDTO;
import com.ChronoChords.ChronoChords.model.User;
import com.ChronoChords.ChronoChords.model.loginResponse;

public interface userService {
    String addUser(User user);

    loginResponse loginUser(loginDTO loginDTO);
}

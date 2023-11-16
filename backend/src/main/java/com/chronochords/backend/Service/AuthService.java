package com.chronochords.backend.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface AuthService {
    String createSpotifyAuthorizationURI();
    void handleSpotifyUserCode(String userCode, String error, HttpServletResponse response) throws IOException;
    String refreshToken();
}


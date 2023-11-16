package com.chronochords.backend.Controller;

import com.chronochords.backend.Service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;


import java.io.IOException;
import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {

    // Redirect URI must match the one found on the Spotify developer dashboard settings.
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8085/api/get-user-code");
    private final AuthService authService;
    private String code = "";

    // Create environment variables for SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
    //
    // Run this in your shell:
    // export SPOTIFY_CLIENT_ID=your_client_id
    // export SPOTIFY_CLIENT_SECRET=your_client_secret
    private static final String CLIENT_ID = System.getenv("SPOTIFY_CLIENT_ID");
    private static final String CLIENT_SECRET = System.getenv("SPOTIFY_CLIENT_SECRET");
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(CLIENT_ID)
            .setClientSecret(CLIENT_SECRET)
            .setRedirectUri(redirectUri)
            .build();

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        return authService.createSpotifyAuthorizationURI();
    }

    @GetMapping(value = "get-user-code")
    public void getSpotifyUserCode(@RequestParam(value = "code", required = false) String userCode,
                                   @RequestParam(value = "error", required = false) String error,
                                   HttpServletResponse response) throws IOException {
        authService.handleSpotifyUserCode(userCode, error, response);
    }

    @GetMapping("/refresh-token")
    public String refreshToken() {
        return authService.refreshToken();
    }
}



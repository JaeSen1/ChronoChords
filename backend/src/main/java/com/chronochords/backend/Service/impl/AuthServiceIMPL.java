package com.chronochords.backend.Service.impl;

import com.chronochords.backend.Service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

import java.io.IOException;
import java.net.URI;

@Service
public class AuthServiceIMPL implements AuthService {

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8085/api/get-user-code");
    private static final String CLIENT_ID = System.getenv("SPOTIFY_CLIENT_ID");
    private static final String CLIENT_SECRET = System.getenv("SPOTIFY_CLIENT_SECRET");
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(CLIENT_ID)
            .setClientSecret(CLIENT_SECRET)
            .setRedirectUri(redirectUri)
            .build();
    private String code = "";

    @Override
    public String createSpotifyAuthorizationURI() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("playlist-modify-public, playlist-modify-private")
                .show_dialog(true)
                .build();
        return authorizationCodeUriRequest.execute().toString();
    }

    @Override
    public void handleSpotifyUserCode(String userCode, String error, HttpServletResponse response) throws IOException {
        if (error != null) {
            response.sendRedirect("http://localhost:3000/");
            return;
        }

        if (userCode != null) {
            this.code = userCode;
            processAuthorizationCode(response);
        } else {
            response.sendRedirect("http://localhost:3000/");
        }
    }

    private void processAuthorizationCode(HttpServletResponse response) throws IOException {
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
        try {
            AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
            response.sendRedirect("http://localhost:3000/decadechart");
        } catch (Exception e) {
            response.sendRedirect("http://localhost:3000/");
        }
    }

    @Override
    public String refreshToken() {
        // Implement token refresh logic here
        return "Token refreshed";
    }
}



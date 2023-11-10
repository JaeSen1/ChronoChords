package com.chronochords.backend.Controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;


import java.io.IOException;
import java.net.URI;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {

    // Redirect URI must match the one found on the Spotify developer dashboard settings.
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8085/api/get-user-code");
    private String code = "";

    // Create environment variables for SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
    //
    // Run this in your shell:
    // export SPOTIFY_CLIENT_ID=your_client_id
    // export SPOTIFY_CLIENT_SECRET=your_client_secret
    private static final String CLIENT_ID = System.getenv("SPOTIFY_CLIENT_ID");
    private static final String CLIENT_SECRET = "SPOTIFY_CLIENT_SECRET";

    private String refreshToken = null;

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(CLIENT_ID)
            .setClientSecret(CLIENT_SECRET)
            .setRedirectUri(redirectUri)
            .build();

    @GetMapping("login")
    @ResponseBody
    public String spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .show_dialog(true)
                .build();
        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }

    @GetMapping(value = "get-user-code")
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();

        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();

            // Set access and refresh token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        response.sendRedirect("http://localhost:3000/maingame");
        return spotifyApi.getAccessToken();
    }

    // A method to refresh the access token
    private void refreshAccessToken() {
        if (refreshToken != null && !refreshToken.isEmpty()) {
            SpotifyApi spotifyApi = new SpotifyApi.Builder()
                    .setClientId(CLIENT_ID)
                    .setClientSecret(CLIENT_SECRET)
                    .setRefreshToken(refreshToken)
                    .build();

            AuthorizationCodeRefreshRequest refreshRequest = spotifyApi.authorizationCodeRefresh().build();

            try {
                final AuthorizationCodeCredentials credentials = refreshRequest.execute();

                // Update the access token
                spotifyApi.setAccessToken(credentials.getAccessToken());

                // Optionally, store the new access token securely for future use

                System.out.println("New access token: " + credentials.getAccessToken());
                System.out.println("Expires in: " + credentials.getExpiresIn());
            } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
                System.out.println("Error refreshing token: " + e.getMessage());
                // Handle refresh failure, possibly re-authenticate
            }
        }
    }
}



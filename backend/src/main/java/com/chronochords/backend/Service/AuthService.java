package com.chronochords.backend.Service;

import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;

public interface AuthService {
    void clientCredentials_Sync();
}


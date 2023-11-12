package com.chronochords.backend.Service;

import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;

public interface SpotifyService {
    void clientCredentials_Sync();
    Track getTrack(String trackId) throws IOException, SpotifyWebApiException, ParseException;
}


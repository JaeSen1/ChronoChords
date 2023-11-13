package com.chronochords.backend.Service;

import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;
import java.util.List;

public interface SongService {
    List<Track> loadMusicFromDatabase() throws Exception;
    Playlist getPlaylistById(String playlistId) throws IOException, SpotifyWebApiException, ParseException;
    Track getSingleTrackById(String trackId) throws IOException, SpotifyWebApiException, ParseException;
    void saveSongsFromSpotifyPlaylist(String playlistId);

}

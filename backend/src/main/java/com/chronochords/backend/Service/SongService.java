package com.chronochords.backend.Service;

import com.chronochords.backend.Entity.Song;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface SongService {
    List<Song> loadMusicFromDatabase() throws Exception;
    Playlist getPlaylistById(String playlistId) throws IOException, SpotifyWebApiException, ParseException;
    Track getSingleTrackById(String trackId) throws IOException, SpotifyWebApiException, ParseException;
    void saveSongsFromSpotifyPlaylist(String playlistId);
    void saveTrackById(String trackId) throws IOException, ParseException, SpotifyWebApiException, java.text.ParseException;
    Map<String, Double> getSongsPercentageByDecade();
}

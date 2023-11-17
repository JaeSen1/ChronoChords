package com.chronochords.backend.Controller;

import com.chronochords.backend.Entity.Song;
import com.chronochords.backend.Service.SongService;
import org.apache.hc.core5.http.ParseException;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/spotify")
public class SongController {

    private final SongService songService;

    private static final Logger logger = LoggerFactory.getLogger(SongController.class);


    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/track/{id}")
    public ResponseEntity<?> getTrack(@PathVariable String id) {
        try {
            Track track = songService.getSingleTrackById(id);
            logger.info("Track Retrieved: " + track.getName()); // Log the track name
            return ResponseEntity.ok(track);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage()); // Log the error message
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/loadallmusic")
    public ResponseEntity<List<Song>> getSongs() {
        try {
            List<Song> songs = songService.loadMusicFromDatabase();
            return ResponseEntity.ok(songs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/playlist/{playlistid}")
    public ResponseEntity<?> getPlaylist(@PathVariable String playlistid) {
        try {
            Playlist playlist = songService.getPlaylistById(playlistid);
            logger.info("Playlist Received: " + playlist.getName()); // Log the track name
            return ResponseEntity.ok(playlist);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage()); // Log the error message
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/saveFromSpotifyPlaylist")
    public int saveSongsFromPlaylist(@RequestParam String playlistId) {
        int numSaved = songService.saveSongsFromSpotifyPlaylist(playlistId);
        return numSaved;
    }

    @PostMapping("/saveTrackById")
    public void saveTrackById(@RequestParam String trackId) throws IOException, ParseException, java.text.ParseException, SpotifyWebApiException {
        songService.saveTrackById(trackId);
    }

    @GetMapping("/percentageByDecade")
    public Map<String, Object> getSongsPercentageByDecade() {
        return songService.getSongsPercentageByDecade();
    }

    @PostMapping("/add-to-playlist")
    public ResponseEntity<?> addToPlaylist(@RequestParam String songId) {
        return null;
    }
}


package com.chronochords.backend.Controller;

import com.chronochords.backend.Service.SpotifyService;
import com.chronochords.backend.Service.impl.SongServiceIMPL;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/spotify")
public class SpotifyController {

    private final SpotifyService spotifyService;
    private final SongServiceIMPL songServiceIMPL;

    private static final Logger logger = LoggerFactory.getLogger(SpotifyController.class);


    @Autowired
    public SpotifyController(SpotifyService spotifyService, SongServiceIMPL songServiceIMPL) {
        this.spotifyService = spotifyService;
        this.songServiceIMPL = songServiceIMPL;
    }

    @GetMapping("/refresh-token")
    public String refreshToken() {
        spotifyService.clientCredentials_Sync();
        return "Token refreshed";
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrack(@PathVariable String id) {
        try {
            Track track = spotifyService.getTrack(id);
            logger.info("Track Retrieved: " + track.getName()); // Log the track name
            return ResponseEntity.ok(track);
        } catch (Exception e) {
            logger.error("Error: " + e.getMessage()); // Log the error message
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/loadmusic")
    public ResponseEntity<List<Track>> getSongs() {
        try {
            List<Track> songs = songServiceIMPL.getSongs();
            return ResponseEntity.ok(songs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}


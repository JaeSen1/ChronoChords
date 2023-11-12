package com.chronochords.backend.Service.impl;

import com.chronochords.backend.Entity.Song;
import com.chronochords.backend.Repository.SongRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;

import java.util.ArrayList;
import java.util.List;
@Service
public class SongServiceIMPL {

    @Autowired
    private SongRepo songRepo;

    @Autowired
    private SpotifyApi spotifyApi;

    public List<Track> getSongs() throws Exception {
        Pageable limit = PageRequest.of(0, 10); // Fetching the first 10 songs
        List<Song> songEntities = songRepo.findAll(limit).getContent(); // Getting the list of SongEntity from Page
        List<Track> songs = new ArrayList<>();

        for (Song songEntity : songEntities) {
            GetTrackRequest getTrackRequest = spotifyApi.getTrack(songEntity.getSongId()).build();
            songs.add(getTrackRequest.execute());
        }

        return songs;
    }
}


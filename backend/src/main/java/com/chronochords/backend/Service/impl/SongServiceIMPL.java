package com.chronochords.backend.Service.impl;

import com.chronochords.backend.Entity.Song;
import com.chronochords.backend.Repository.SongRepo;
import com.chronochords.backend.Service.SongService;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class SongServiceIMPL implements SongService {

    @Autowired
    private SongRepo songRepo;

    @Autowired
    private SpotifyApi spotifyApi;

    @Override
    public Track getSingleTrackById(String trackId) throws IOException, SpotifyWebApiException, ParseException {
        GetTrackRequest getTrackRequest = spotifyApi.getTrack(trackId).build();
        return getTrackRequest.execute();
    }

    public List<Track> loadMusicFromDatabase() throws Exception {
        Pageable limit = PageRequest.of(0, 10); // Fetching the first 10 songs
        List<Song> songEntities = songRepo.findAll(limit).getContent(); // Getting the list of SongEntity from Page
        List<Track> songs = new ArrayList<>();

        for (Song songEntity : songEntities) {
            GetTrackRequest getTrackRequest = spotifyApi.getTrack(songEntity.getSongId()).build();
            songs.add(getTrackRequest.execute());
        }

        return songs;
    }

    public Playlist getPlaylistById(String playlistId) throws IOException, SpotifyWebApiException, ParseException {
        GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(playlistId).build();
        return getPlaylistRequest.execute();
    }
}


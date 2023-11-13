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
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.PlaylistTrack;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistsItemsRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;

import java.io.IOException;
import java.text.SimpleDateFormat;
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

    @Override
    public List<Song> loadMusicFromDatabase() {
        Pageable limit = PageRequest.of(0, 10000); // Fetching the first 20 songs
        List<Song> songEntities = songRepo.findAll(limit).getContent(); // Getting the list of Song entities from the database
        return songEntities; // Return the list of Song entities
    }

    @Override
    public Playlist getPlaylistById(String playlistId) throws IOException, SpotifyWebApiException, ParseException {
        GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(playlistId).build();
        return getPlaylistRequest.execute();
    }

    @Override
    public void saveSongsFromSpotifyPlaylist(String playlistId) {
        try {
            int offset = 0;
            int limit = 100; // The maximum limit is usually defined by the API
            SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");

            while (true) {
                GetPlaylistsItemsRequest getPlaylistsItemsRequest = spotifyApi
                        .getPlaylistsItems(playlistId)
                        .offset(offset)
                        .limit(limit)
                        .build();

                Paging<PlaylistTrack> playlistTrackPaging = getPlaylistsItemsRequest.execute();
                if (playlistTrackPaging.getItems().length == 0) {
                    break; // Exit the loop if no more tracks are found
                }

                for (PlaylistTrack playlistTrack : playlistTrackPaging.getItems()) {
                    Track track = (Track) playlistTrack.getTrack();
                    if (track != null && track.getPreviewUrl() != null && track.getAlbum().getImages().length != 0) {
                        if (!songRepo.existsBySongNameAndArtistName(track.getName(), track.getArtists()[0].getName()) && !songRepo.existsByPreviewUrl(track.getPreviewUrl())) {
                            Song song = new Song();
                            song.setSongName(track.getName());
                            song.setPreviewUrl(track.getPreviewUrl());
                            song.setAlbumCover(track.getAlbum().getImages()[0].getUrl());
                            song.setArtistName(track.getArtists()[0].getName());
                            song.setAlbumName(track.getAlbum().getName());
                            song.setReleaseYear(yearFormat.parse(track.getAlbum().getReleaseDate().substring(0, 4)));
                            song.setSongId(track.getId());
                            songRepo.save(song);
                        }
                    }
                }

                offset += limit; // Move to the next set of tracks
            }
        } catch (IOException | SpotifyWebApiException | ParseException | java.text.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}


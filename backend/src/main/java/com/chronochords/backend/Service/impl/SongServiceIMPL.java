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
import java.util.*;

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
        return songRepo.findAll(limit).getContent(); // Return the list of Song entities
    }

    @Override
    public Playlist getPlaylistById(String playlistId) throws IOException, SpotifyWebApiException, ParseException {
        GetPlaylistRequest getPlaylistRequest = spotifyApi.getPlaylist(playlistId).build();
        return getPlaylistRequest.execute();
    }

    @Override
    public void saveTrackById(String trackId) throws IOException, ParseException, SpotifyWebApiException, java.text.ParseException {
        GetTrackRequest getTrackRequest = spotifyApi.getTrack(trackId).build();
        Track track = getTrackRequest.execute();
        SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
        saveValidTrack(track, yearFormat);
    }

    @Override
    public int saveSongsFromSpotifyPlaylist(String playlistId) {
        int numSaved = 0;
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
                    if (saveValidTrack(track, yearFormat)) {
                        numSaved++;
                    }
                }
                offset += limit; // Move to the next set of tracks
            }
        } catch (IOException | SpotifyWebApiException | ParseException | java.text.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return numSaved;
    }

    public Map<String, Object> getSongsPercentageByDecade() {
        List<Song> songs = songRepo.findAll();
        Map<String, Integer> countByDecade = new HashMap<>();
        int totalSongs = songs.size();

        // Initialize the map with all decades from 1900 to 2020s, set to 0
        Map<String, Double> percentageByDecade = new HashMap<>();
        for (int year = 1900; year <= 2020; year += 10) {
            percentageByDecade.put(year + "s", 0.0);
            countByDecade.put(year + "s", 0);
        }

        for (Song song : songs) {
            if (song.getReleaseYear() != null) {
                String decade = getDecade(song.getReleaseYear());
                countByDecade.put(decade, countByDecade.getOrDefault(decade, 0) + 1);
            }
        }

        for (Map.Entry<String, Integer> entry : countByDecade.entrySet()) {
            double percentage = (entry.getValue() * 100.0) / totalSongs;
            percentageByDecade.put(entry.getKey(), percentage);
        }

        // Create a map to hold both counts and percentages
        Map<String, Object> result = new HashMap<>();
        result.put("totalSongs", totalSongs);
        result.put("countByDecade", countByDecade);
        result.put("percentageByDecade", percentageByDecade);

        return result;
    }


    private String getDecade(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int year = cal.get(Calendar.YEAR);
        int decadeStart = (year / 10) * 10;
        return decadeStart + "s";
    }

    private boolean saveValidTrack(Track track, SimpleDateFormat yearFormat) throws java.text.ParseException {
        if (track != null && track.getPreviewUrl() != null && track.getAlbum().getImages().length != 0) {
            if (!songRepo.existsBySongNameAndArtistName(track.getName(), track.getArtists()[0].getName()) && !songRepo.existsByPreviewUrl(track.getPreviewUrl())) {
                Song song = new Song();
                song.setSongName(track.getName());
                song.setPreviewUrl(track.getPreviewUrl());
                song.setAlbumCover(track.getAlbum().getImages()[0].getUrl());
                song.setArtistName(track.getArtists()[0].getName());
                song.setAlbumName(track.getAlbum().getName());
                song.setReleaseYear(yearFormat.parse(track.getAlbum().getReleaseDate().substring(0, 4)));
                song.setPopularityRating(track.getPopularity());
                song.setSpotifyLink(track.getExternalUrls().getExternalUrls().get("spotify"));
                song.setSongId(track.getId());
                songRepo.save(song);
                return true;
            }
        }
        return false;
    }


}

// String gptQuery = "Write a description for " + songName + " by " + artistName + " in under 200 words.";
//
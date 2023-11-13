package com.chronochords.backend.Entity;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "songs", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"song_name", "artist_name"})
})
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "song_name", nullable = false)
    private String songName;
    @Column(name = "artist_name")
    private String artistName;
    @Column(name = "album_name")
    private String albumName;
    @Column(name = "release_year", nullable = false)
    private Date releaseYear;
    @Column(name = "song_id", nullable = false, unique = true)
    private String songId;
    @Column(name = "preview_url", nullable = false, unique = true)
    private String previewUrl;
    @Column(name = "album_cover")
    private String albumCover;
    @Column(name = "song_description")
    private String songDescription;

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public Date getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Date releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSongId() {
        return songId;
    }

    public void setSongId(String trackId) {
        this.songId = trackId;
    }

    public String getPreviewUrl() {
        return previewUrl;
    }

    public void setPreviewUrl(String previewUrl) {
        this.previewUrl = previewUrl;
    }

    public String getSongDescription() {
        return songDescription;
    }

    public void setSongDescription(String songDescription) {
        this.songDescription = songDescription;
    }

    public String getAlbumCover() {
        return albumCover;
    }

    public void setAlbumCover(String albumCover) {
        this.albumCover = albumCover;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }
}

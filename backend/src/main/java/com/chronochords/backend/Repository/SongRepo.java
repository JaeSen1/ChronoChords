package com.chronochords.backend.Repository;

import com.chronochords.backend.Entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface SongRepo extends JpaRepository<Song, Long> {
    Page<Song> findAll(Pageable pageable);
    boolean existsBySongNameAndArtistName(String songName, String artistName);
    boolean existsByPreviewUrl(String previewUrl);
}
import '../App.css';
import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import RoundCount from '../components/RoundCount';
import MusicPlayer from '../components/MusicPlayer';
import Popup from '../components/Popup';
import ScoreDisplay from '../components/ScoreDisplay';


export default function MainGame() {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(null); // this will be reset every round

    const [songs, setSongs] = useState([]);

    const [songIndex, setSongIndex] = useState(0); // to keep track of the current song
    const [reveal, setReveal] = useState(false); // to control revealing song details

    const [userGuess, setUserGuess] = useState(1960); // initial value

    const [sliderLocked, setSliderLocked] = useState(false);
    const [actualYear, setActualYear] = useState(null);
    
    //url: data.previewUrl
    //cover: data.images[0]
    //year: data.album.releaseDate (set to year only)
    //artist: data.artists[0].name
    //album: data.album.name

    const fetchAllTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/loadmusic`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const formattedSongs = data.map(songData => ({
                    url: songData.previewUrl,
                    title: songData.name,
                    cover: songData.album.images[0].url,
                    year: new Date(songData.album.releaseDate).getFullYear().toString(),
                    artist: songData.artists[0].name,
                    album: songData.album.name
                }));
                setSongs(formattedSongs);
            })
            .catch(error => console.error('Error fetching track details:', error));
    };

    useEffect(() => {
        fetchAllTrackDetails();
    }, []); // Empty dependency array means this runs once on mount
    
    const currentSong = songs[songIndex];

    // console.log(songs);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // 2. Handle advancing to the next game/round
    const handleNextGame = () => {
        if (round < 5) {
            setRound(round + 1);
            setSongIndex((songIndex + 1) % songs.length); // go to the next song, loop back to the first song if needed
            setScore(null); // reset the score
            setReveal(false); // hide details for the new round
            setSliderLocked(false);
            setActualYear(null); // Reset for the next round
            setUserGuess(1960);
        }
    };

    const handleSliderChange = (event, newValue) => {
        setUserGuess(newValue);
    };

    const handleGuess = () => {
        const actualYear = currentSong.year;
        const difference = Math.abs(actualYear - userGuess); // Calculate the difference in years.
    
        // Constants for calculation
        const maxScore = 1000;
        const minDifference = 0; // When the user's guess is correct
        const maxDifference = 20; // The point after which user gets a score of 0
    
        let newScore;
    
        if (difference === minDifference) {
            // The guess is correct.
            newScore = maxScore;
        } else if (difference >= maxDifference) {
            // No points if 20 or more years off.
            newScore = 0;
        } else {
            // Initialize the score to the maximum possible.
            newScore = maxScore;
    
            // Calculate the deduction for each year.
            for (let i = 1; i <= difference; i++) {
                // For each year, the penalty increases by 0.2% compared to the previous year.
                // It starts at 3% for the first year off, then 3.2% for the second year, and so on.
                const penaltyForThisYear = 3 + (i - 1) * 0.2; // This calculates the increased penalty.
                
                // Calculate the actual points to deduct for this year and subtract them from the current score.
                const pointsDeducted = (penaltyForThisYear / 100) * maxScore;
                newScore -= pointsDeducted;
            }
    
            // Optional: Ensure the score doesn't go below 0 due to any unexpected behavior.
            // (not necessary in this logic, but good as a safety measure).
            newScore = Math.max(newScore, 0);
        }
    
        // Update the score state.
        setScore(newScore);
    
        // Reveal song details after guessing
        setReveal(true);
    
        // Set the actual year and lock the slider after the user makes a guess
        setActualYear(actualYear);
        setSliderLocked(true);
    };

    return (
        <div className="App">
            <RoundCount round={round} />
            <ScoreDisplay score={score} />
            <div className="Slider-container">
                <Slider 
                    value={userGuess} 
                    onChange={handleSliderChange} 
                    onSubmit={handleGuess} 
                    onNextRound={handleNextGame}
                    finalRound={round >= 5} // true if it's the final round, else false
                    locked={sliderLocked}
                    actualYear={actualYear}
                />
            </div>
            <div className="Musicplayer-container">
            <MusicPlayer 
                url={currentSong?.url} 
                songDetails={{
                    cover: currentSong?.cover,
                    artist: currentSong?.artist,
                    title: currentSong?.title,
                    album: currentSong?.album,
                }}
                reveal={reveal}
                onMoreInfo={handleOpenModal}  // Passing the function to open the modal
            />
            <Popup
                songData={{
                    title: currentSong?.title,
                    artist: currentSong?.artist,
                    album: currentSong?.album,
                    description: currentSong?.description
                }}
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)}  // Function to close the modal
            />
            </div>
        </div>
    );
}
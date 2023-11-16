import '../App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Slider from '../components/Slider';
import RoundCount from '../components/RoundCount';
import MusicPlayer from '../components/MusicPlayer';
import Popup from '../components/Popup';
import ScoreDisplay from '../components/ScoreDisplay';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const getInitialState = (token) => {
    const savedGameState = sessionStorage.getItem(`gameState-${token}`);
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        return gameState;
    } else {
        return {
            round: 1,
            score: null,
            songs: [],
            songIndex: 0,
            reveal: false,
            sliderLocked: false,
            actualYear: null,
            isSubmitted: false
        };
    }
};

export default function MainGame() {
    let { token } = useParams(); // token parameter passed from url.

    const initialState = getInitialState(token);

    const [round, setRound] = useState(initialState.round);
    const [score, setScore] = useState(initialState.score);
    const [songs, setSongs] = useState(initialState.songs);
    const [songIndex, setSongIndex] = useState(initialState.songIndex); // to keep track of the current song
    const [reveal, setReveal] = useState(initialState.reveal); // to control revealing song details
    const [userGuess, setUserGuess] = useState(1960); // initial value
    const [sliderLocked, setSliderLocked] = useState(initialState.sliderLocked);
    const [actualYear, setActualYear] = useState(initialState.actualYear);
    const [isSubmitted, setIsSubmitted] = useState(initialState.isSubmitted);
    const navigate = useNavigate();
    //url: data.previewUrl
    //cover: data.images[0]
    //year: data.album.releaseDate (set to year only)
    //artist: data.artists[0].name
    //album: data.album.name
    //artistDescription: 

    const fetchAllTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/loadallmusic`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const formattedSongs = data.map(songData => ({
                    url: songData.previewUrl,
                    title: songData.songName,
                    cover: songData.albumCover,
                    year: new Date(songData.releaseYear).getFullYear().toString(),
                    artist: songData.artistName,
                    album: songData.albumName,
                    //artistDescription: songData.
                }));
                setSongs(formattedSongs);
            })
            .catch(error => console.error('Error fetching track details:', error));
    };

    const saveGameState = useCallback(() => {
        const gameState = {
            round,
            score,
            songs,
            songIndex,
            reveal,
            sliderLocked,
            actualYear,
            isSubmitted
        };
        sessionStorage.setItem(`gameState-${token}`, JSON.stringify(gameState));
    }, [round, score, songs, songIndex, reveal, sliderLocked, actualYear, isSubmitted, token]);
    
    useEffect(() => {
        saveGameState();
    }, [saveGameState]);
    
    useEffect(() => {
        // Define the function to validate the token
        const validateToken = async () => {
            try {
                await axios.get(`http://localhost:8085/api/game/validate-token/${token}`);
                // If the token is valid, we can proceed to fetch track details or other actions
                fetchAllTrackDetails();
            } catch (error) {
                // If the token is invalid, redirect to the login page or another appropriate page
                navigate('/gameselection');
            }
        };
        validateToken();
    }, [token, navigate]);
    
    const endGame = () => {
        try {
            // Construct the params to be sent with the POST request
            const params = new URLSearchParams();
            params.append('token', token);
            sessionStorage.removeItem('gamestate-' + token);
            // Call the backend to end the game
            axios.post("http://localhost:8085/api/game/end", params);

            // Here you can navigate to a different route or display a game over message
            navigate('/gameselection'); // Redirect to the game selection page
        } catch (error) {
            console.error('Error ending the game:', error);
        }
    };

    const currentSong = songs[songIndex];
    const numRounds = songs.length;
    
    // console.log(songs);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // 2. Handle advancing to the next game/round
    const handleNextGame = () => {
        console.log(round);
        if (round >= numRounds-1) { //Check for +1 since it starts at 0
            // If this was the last round, end the game
            console.log("Game Ended");
            endGame();
        } else {
            // Not the last round yet, advance to the next one
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
        const actualYear = Number(currentSong.year);
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
            <RoundCount round={round} numRounds={numRounds}/>
            <ScoreDisplay score={score} />
            <div className="Slider-container">
                <Slider 
                    value={userGuess} 
                    onChange={handleSliderChange} 
                    onSubmit={handleGuess} 
                    onNextRound={handleNextGame}
                    finalRound={round >= numRounds} // true if it's the final round, else false
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
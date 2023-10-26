import '../App.css';
import React, { useState } from 'react';
import Slider from '../components/Slider';
import MusicPlayer from '../components/MusicPlayer';
import RoundCount from '../components/RoundCount';
import ScoreDisplay from '../components/ScoreDisplay';


export default function MainGame() {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(null); // this will be reset every round
    const [songIndex, setSongIndex] = useState(0); // to keep track of the current song
    const [reveal, setReveal] = useState(false); // to control revealing song details

    const [userGuess, setUserGuess] = useState(1960); // initial value

    const songs = [
        { url: 'music/beatlesholdyourhand.mp3', cover: 'covers/beatlesholdyourhand.jpg', year: 1964, title: 'I Want to Hold Your Hand', artist: 'The Beatles', album: 'Meet the Beatles!' },
        { url: 'music/kissmethruthephone.mp3', cover: 'covers/kissmethruthephone.jpg', year: 2008, title: 'Kiss Me Thru the Phone', artist: 'Soulja Boy', album: 'iSouljaBoyTellem' },
        { url: 'music/taylorswift22.mp3', cover: 'covers/taylorswift22.png', year: 2012, title: '22', artist: 'Taylor Swift', album: 'Red' },
        { url: 'music/TootTootTootsie.mp3', cover: 'covers/TootTootTootsie.jpg', year: 1922, title: 'Toot, Toot, Tootsie (Goo\' Bye!)', artist: 'Leo Feist, Inc.', album: 'N/A' },
        { url: 'music/vanhalenjump.mp3', cover: 'covers/vanhalenjump.jpg', year: 1984, title: 'Jump', artist: 'Van Halen', album: '1984' },
    ]
    
    const currentSong = songs[songIndex];

    // 2. Handle advancing to the next game/round
    const handleNextGame = () => {
        if (round < 5) {
            setRound(round + 1);
            setSongIndex((songIndex + 1) % songs.length); // go to the next song, loop back to the first song if needed
            setScore(null); // reset the score
            setReveal(false); // hide details for the new round
        }
    };

    // Handler for the slider change
    const handleSliderChange = (event, newValue) => {
        setUserGuess(newValue);
    };

    const handleGuess = (guess) => {
    const actualYear = currentSong.year;
    const difference = Math.abs(actualYear - userGuess);

    // Constants for calculation
    const maxScore = 1000;
    const minDifference = 0; // when the user's guess is correct
    const maxDifference = 20; // the point after which user gets a score of 0

    let newScore;

    if (difference === minDifference) {
        // The guess is correct.
        newScore = maxScore;
    } else if (difference >= maxDifference) {
        // No points if 20 or more years off.
        newScore = 0;
    } else {
        // Calculate the decay rate from the 1-year difference condition.
        // We want the score to be around 800 for a 1-year difference.
        // Solving the equation 800 = 1000 - decayRate * log(2), we get the approximate decay rate.
        const targetScoreTwoYearDiff = 800;
        const decayRate = (maxScore - targetScoreTwoYearDiff) / Math.log(2);

        // Now apply the scoring formula for differences between 1 and 19 years.
        newScore = Math.floor(maxScore - decayRate * Math.log(difference + 1)); // +1 to avoid log(0)

        // Ensure the score doesn't go below 0 due to approximation, rounding.
        newScore = Math.max(newScore, 0);
    }

    // Update the score state.
    setScore(newScore);

    // Reveal song details after guessing
    setReveal(true);
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
                />
            </div>
            <div className="Musicplayer-container">
            <MusicPlayer 
                url={currentSong.url} 
                songDetails={{
                    cover: currentSong.cover,
                    artist: currentSong.artist,
                    title: currentSong.title,
                    album: currentSong.album,
                }}
                reveal={reveal}
            />
            </div>
        </div>
    );
}
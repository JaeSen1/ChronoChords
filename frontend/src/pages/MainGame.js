import '../App.css';
import React, { useState } from 'react';
import Slider from '../components/Slider';
import MusicPlayer from '../components/MusicPlayer';
import Score from '../components/Score';


export default function MainGame() {
    const actualYear = 2008; // this could come from your data source
    const [userGuess, setUserGuess] = useState(1960); // initial value
    const [score, setScore] = useState(null);

    // Handler for the slider change
    const handleSliderChange = (event, newValue) => {
        setUserGuess(newValue);
    };

    const handleSubmitGuess = () => {
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
};


    return (
        <div className="App">
            <div className="Slider-container">
            <Slider 
                value={userGuess} 
                onChange={handleSliderChange} 
                onSubmit={handleSubmitGuess} 
            />
        </div>
        <div className="Musicplayer-container">
            <MusicPlayer />
        </div>
        {/* Display the score somewhere */}
        {score !== null && <div>Your score: {score}</div>}
        </div>
    );
}
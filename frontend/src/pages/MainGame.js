import '../App.css';
import React, { useState } from 'react';
import Slider from '../components/Slider';
import MusicPlayer from '../components/Musicplayer';
import RoundCount from '../components/RoundCount';
import Popup from '../components/Popup';
import ScoreDisplay from '../components/ScoreDisplay';


export default function MainGame() {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(null); // this will be reset every round
    const [songIndex, setSongIndex] = useState(0); // to keep track of the current song
    const [reveal, setReveal] = useState(false); // to control revealing song details

    const [userGuess, setUserGuess] = useState(1960); // initial value

    const [sliderLocked, setSliderLocked] = useState(false);
    const [actualYear, setActualYear] = useState(null);

    const songs = [
        { url: 'music/beatlesholdyourhand.mp3', description: '"I Want to Hold Your Hand" is a timeless classic by The Beatles, first released in 1963. The track marked a pivotal moment in the band\'s career, propelling them to international stardom and igniting Beatlemania. Written by John Lennon and Paul McCartney, the song\'s uplifting melody, enthusiastic vocals, and exuberant lyrics encapsulate the euphoria of new love and the desire for connection that is universally relatable.', cover: 'covers/beatlesholdyourhand.jpg', year: 1963, title: 'I Want to Hold Your Hand', artist: 'The Beatles', album: 'Meet the Beatles!' },
        { url: 'music/kissmethruthephone.mp3', description: '"Kiss Me Thru the Phone" is a signature track from Soulja Boy Tell\'em, released in 2008, featuring emotive vocals from the R&B singer Sammie. This song, which quickly became a staple of late 2000s pop culture, blends hip-hop rhythms with elements of pop and R&B, creating an anthem for long-distance relationships in the digital age.', cover: 'covers/kissmethruthephone.jpg', year: 2008, title: 'Kiss Me Thru the Phone', artist: 'Soulja Boy', album: 'iSouljaBoyTellem' },
        { url: 'music/taylorswift22.mp3', description: '"22" is a song by American singer-songwriter Taylor Swift, from her fourth studio album, "Red" (2012). The song was released as the album\'s fourth single on March 12, 2013. Swift, known for her narrative songwriting, presents a buoyant track that reflects the ups and downs of the early twenties age.', cover: 'covers/taylorswift22.png', year: 2012, title: '22', artist: 'Taylor Swift', album: 'Red' },
        { url: 'music/TootTootTootsie.mp3', description: '"Toot, Toot, Tootsie (Goo\' Bye)" is a classic song that stands as a hallmark of early 20th-century music, originally recorded by Al Jolson. This song, widely popular in the 1920s, is a quintessential show tune, best known for its vibrant, catchy melody and spirited "goodbye" theme that almost anyone can sing along to.', cover: 'covers/TootTootTootsie.jpg', year: 1922, title: 'Toot, Toot, Tootsie (Goo\' Bye!)', artist: 'Al Jolson', album: '' },
        { url: 'music/vanhalenjump.mp3', description: '"Jump" is perhaps one of the most iconic songs by American rock band Van Halen. Released in 1984, it immediately claimed the airwaves and the top of the charts, becoming an instant classic in the rock genre and beyond. Synonymous with the \'80s rock era\'s exuberance and innovation, "Jump" is emblematic of a time when musical boundaries were relentlessly pushed to new frontiers.', cover: 'covers/vanhalenjump.jpg', year: 1984, title: 'Jump', artist: 'Van Halen', album: '1984' },
    ]
    
    const currentSong = songs[songIndex];

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
                url={currentSong.url} 
                songDetails={{
                    cover: currentSong.cover,
                    artist: currentSong.artist,
                    title: currentSong.title,
                    album: currentSong.album,
                }}
                reveal={reveal}
                onMoreInfo={handleOpenModal}  // Passing the function to open the modal
            />
            <Popup
                songData={{
                    title: currentSong.title,
                    artist: currentSong.artist,
                    album: currentSong.album,
                    description: currentSong.description
                }}
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)}  // Function to close the modal
            />
            </div>
        </div>
    );
}
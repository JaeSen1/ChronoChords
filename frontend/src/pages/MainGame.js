import '../App.css';
import React, { useState } from 'react';
import Slider from '../components/Slider';
import MusicPlayer from '../components/MusicPlayer';
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
        { url: 'music/beatlesholdyourhand.mp3', description: '"I Want to Hold Your Hand" is a timeless classic by The Beatles, first released in 1963. The track marked a pivotal moment in the band\'s career, propelling them to international stardom and igniting Beatlemania. Written by John Lennon and Paul McCartney, the song\'s uplifting melody, enthusiastic vocals, and exuberant lyrics encapsulate the euphoria of new love and the desire for connection that is universally relatable.', cover: 'covers/beatlesholdyourhand.jpg', year: 1964, title: 'I Want to Hold Your Hand', artist: 'The Beatles', album: 'Meet the Beatles!' },
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
        }
    };

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
            const targetScoreTwoYearDiff = 860;
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

        // Set the actual year and lock the slider after the user makes a guess
        setActualYear(currentSong.year);
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
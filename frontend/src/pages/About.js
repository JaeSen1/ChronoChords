import React, { useState } from 'react';
import '../App.css';

const About = () => {
 // State to track whether to show the "About" or "How To Play" content
 const [showAbout, setShowAbout] = useState(true);

 // Function to toggle between "About" and "How To Play" content
 const toggleContent = () => {
   setShowAbout(!showAbout);
 };

 return (
   <div className="about-container">
     <h1>{showAbout ? 'About ChronoChords' : 'How To Play ChronoChords'}</h1>
     {showAbout ? (
       <>
         <p>
           Welcome to the colorful world of ChronoChords, where music and fun collide! 🎶✨
         </p>
         <p>
           Our team is on a mission to make music accessible to everyone, from budding musicians to shower singers.
         </p>
         <p>
           But enough of the serious stuff! Let's have some fun. Click the button below to learn how to play ChronoChords!
         </p>
         <button className="toggle-button" onClick={toggleContent}>
           How To Play
         </button>
       </>
     ) : (
       <>
         <p>Upon loading the game, you'll be presented with a user interface that includes a play button. Click on it to begin your musical journey.</p>
         <p>You'll be treated to a snippet of a song. Listen closely, and let the rhythms, melodies, and lyrics jog your memory or provide clues about the era it might be from.</p>
         <p>Once you've listened to the snippet, it's time to guess the release year of the song. Use the slider or input box provided to select a year.</p>
         <p>After you've made your selection, click on the "Submit" button. The closer your guess is to the actual release year, the higher your score will be!</p>
         <p>After submitting your guess, a summary popup will appear, revealing the correct year, the song title, and the artist. This is a great chance to learn more and perhaps discover some new songs to add to your personal playlist!</p>
         <button className="toggle-button" onClick={toggleContent}>
           About ChronoChords
         </button>
       </>
     )}
   </div>
  );
};
export default About;
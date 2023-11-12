import React, { useState } from 'react';

export default function LandingPage() {

    const getSpotifyUserLogin = () => {
        fetch("http://localhost:8085/spotify/refresh-token")
        .then((response) => response.text())
        .then((responseText) => {
            // Handle the response here
            // For example, display a message or update the UI based on the response
            console.log("Token Refresh Response:", responseText);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const [trackId, setTrackId] = useState('');

    const fetchTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/${trackId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.previewUrl); // Process the response data as needed
            })
            .catch(error => console.error('Error fetching track details:', error));
    };

    const fetchAllTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/loadmusic`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Process the response data as needed
            })
            .catch(error => console.error('Error fetching track details:', error));
    };

    return (
        <div>
            <input 
                type="text" 
                value={trackId} 
                onChange={e => setTrackId(e.target.value)} 
                placeholder="Enter Track ID" 
            />
            <button onClick={fetchTrackDetails}>Fetch Track Details</button>
            <button onClick={fetchAllTrackDetails}>Fetch 5 tracks in database</button>
            <div><button onClick={getSpotifyUserLogin}>Refresh Token</button></div>
        </div>
    );
}

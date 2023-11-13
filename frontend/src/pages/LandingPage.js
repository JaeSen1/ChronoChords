import React, { useState } from 'react';

export default function LandingPage() {

    const getSpotifyUserLogin = () => {
        fetch("http://localhost:8085/api/refresh-token")
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

    const [playlistId, setPlaylistId] = useState('');

    const fetchTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/track/${trackId}`)
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
        fetch(`http://localhost:8085/spotify/loadallmusic`)
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

    const fetchPlaylistDetails = () => {
        fetch(`http://localhost:8085/spotify/playlist/${playlistId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Process the response data as needed
        })
        .catch(error => console.error('Error fetching playlist details:', error));
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
            <button onClick={fetchAllTrackDetails}>Fetch 10 tracks in database</button>
            <div><button onClick={getSpotifyUserLogin}>Refresh Token</button></div>
            <input 
                type="text" 
                value={playlistId} 
                onChange={e => setPlaylistId(e.target.value)} 
                placeholder="Enter Playlist ID" 
            />
            <div><button onClick={fetchPlaylistDetails}>Fetch Playlist Details</button></div>
        </div>
    );
}

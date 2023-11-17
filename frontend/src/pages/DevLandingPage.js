import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function DevLandingPage() {
    const navigate = useNavigate();

    const navigateToDecadeChart = () => {
        navigate('/decadechart');
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            marginTop: '5%'
        },
        header: {
            fontSize: '24px',
            margin: '20px 0'
        },
        inputRow: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px'
        },
        input: {
            marginRight: '10px',
            padding: '10px',
            width: '300px'
        },
        button: {
            padding: '10px',
            cursor: 'pointer'
        },
        inputButtonContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        redText: {
            color: 'red',
            marginLeft: '10px'
        }
    };


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

    useEffect(() => {
        getSpotifyUserLogin();
    }, []); // The empty array ensures this effect runs once after initial render

    const [trackName, setTrackName] = useState('');
    const [playlistName, setPlaylistName] = useState('');
    const [numberOfSongs, setNumberOfSongs] = useState(0);

    const [trackId, setTrackId] = useState('');

    const [playlistId, setPlaylistId] = useState('');

    const [numSaved, setNumSaved] = useState(null);

    const fetchTrackDetails = () => {
        fetch(`http://localhost:8085/spotify/track/${trackId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Process the response data as needed
                setTrackName(data.name);
            })
        .catch(error => console.error('Error fetching track details:', error));
    };

    const fetchAllTrackDetailsWithLimit = () => {
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
            setPlaylistName(data.name); // contains the playlist name
            setNumberOfSongs(data.tracks.total); // contains the total num of tracks in the playlist
        })
        .catch(error => console.error('Error fetching playlist details:', error));
    };

    const saveValidTrackById = () => {
        fetch(`http://localhost:8085/spotify/saveTrackById?trackId=${encodeURIComponent(trackId)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data); // Process the response data as needed
        })
        .catch(error => console.error('Error:', error));
    }

    const saveValidSongsFromPlaylist = () => {
        fetch(`http://localhost:8085/spotify/saveFromSpotifyPlaylist?playlistId=${encodeURIComponent(playlistId)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Number of songs saved: ', data);
            setNumSaved(data);
        })
        .catch(error => console.error('Error:', error));
    };
    return (
        <div style={styles.container}>

            <div style={styles.header}>Spotify API Calls</div>

            <div style={styles.inputRow}>
                <div style={styles.inputButtonContainer}>
                    <input
                        type="text"
                        style={styles.input}
                        value={trackId}
                        onChange={e => setTrackId(e.target.value)}
                        placeholder="Enter Track ID"
                    />
                    <button style={styles.button} onClick={fetchTrackDetails}>Fetch Track Details</button>
                    {trackName && <span style={styles.redText}>{trackName} | See console for more information!</span>}
                </div>
            </div>
            <div style={styles.inputRow}>
                <div style={styles.inputButtonContainer}>
                    <input
                        type="text"
                        style={styles.input}
                        value={playlistId}
                        onChange={e => setPlaylistId(e.target.value)}
                        placeholder="Enter Playlist ID"
                    />
                    <button style={styles.button} onClick={fetchPlaylistDetails}>Fetch Playlist Details</button>
                    {playlistName && <span style={styles.redText}>{playlistName} - {numberOfSongs} Songs</span>}
                </div>
            </div>

            <div style={styles.header}>Database API Calls</div>

            <div style={styles.inputRow}>
                <div style={styles.inputButtonContainer}>
                    <input
                        type="text"
                        style={styles.input}
                        value={playlistId}
                        onChange={e => setPlaylistId(e.target.value)}
                        placeholder="Enter Playlist ID for Saving"
                    />
                    <button style={styles.button} onClick={saveValidSongsFromPlaylist}>Save Songs from Playlist</button>
                    {numSaved != null && <span style={styles.redText}>{numSaved} Songs Saved to Database</span>}
                </div>
            </div>
            <div style={styles.inputRow}>
                <input
                    type="text"
                    style={styles.input}
                    value={trackId}
                    onChange={e => setTrackId(e.target.value)}
                    placeholder="Enter Single Track ID for Saving"
                />
                <button style={styles.button} onClick={saveValidTrackById}>Save Single Track by ID</button>
            </div>
            <div style={styles.inputRow}>
                <button style={styles.button} onClick={fetchAllTrackDetailsWithLimit}>Display Songs from Database With Limit</button>
            </div>   

            <div style={styles.inputRow}>
                <button style={styles.button} onClick={navigateToDecadeChart}>View Decade Distribution of Database</button>
            </div>

            <div style={styles.inputRow}>
            <button style={styles.button} onClick={getSpotifyUserLogin}>Refresh Token</button>
            </div>
        </div>
    );
}

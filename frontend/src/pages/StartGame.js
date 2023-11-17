import Selection from '../components/Selection';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const StartGame = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();
    //Stores game modes Change this and it will Reflect in the front end.
        const gameModes = {
            'Classic': {
                title: 'Classic',
                description: 'Guess the year of the song after listening to a 30 second snippet.',
                imageUrl: "/classic2.webp" // Provide a default image URL
            },
            'Daily': {
                title: 'Daily',
                description: 'Guess the year of the song after listening to a 30 second snippet.',
                imageUrl: "/classic3.webp" // Provide a default image URL
            },
            'Multiplayer': {
                title: 'Multiplayer',
                description: 'Guess the year of the song after listening to a 30 second snippet.',
                imageUrl: "/classic4.webp" // Provide a default image URL
            },
            'Coming Soon': {
                title: 'Coming Soon',
                description: 'Guess the year of the song after listening to a 30 second snippet.',
                imageUrl: "/classic.webp" // Provide a default image URL
            }
        }
        
        // Function to handle click events for different squares.
        const handleClick = (text) => {
            switch (text) {
                case 'Classic':
                    startGame(text);
                    break;
                case 'Multiplayer':
                    console.log("Method for Square 2 executed");
                    break;
                case 'Daily':
                    console.log("Method for Square 3 executed");
                    break;
                case 'Coming Soon':
                    break;
                default:
                    break;
            }
        };

        const startGame = async (gameModeKey) => {
            switch(gameModeKey){
                case 'Classic':
                    if (!authUser || !authUser.userId) {
                        navigate('/login', { state: { from: 'StartGame', message: 'You must be logged in to start a Classic Unlimited game.'} });
                    } else {
                        const userId = authUser.userId;
                        const url = `http://localhost:8085/api/game/start/${userId}`;
                    try {
                        const response = await axios.post(url);
                        const token = response.data; // The token received from the backend
                        if (token) {
                            // Navigate to the MainGame component with the token
                            navigate(`/${gameModeKey}/${token}`);
                        } else {
                            // Handle the case where no token is received
                            console.error('No token received');
                        }
                    } catch (error) {
                        // Handle errors: user not found, server error, etc.
                        console.error('Error starting game:', error);
                    }
                }
                    break;
                case 'Daily':
                    if (!authUser || !authUser.userId) {
                        navigate(`${gameModeKey}/Guest`)
                    } else {
                        const userId = authUser.userId;
                        const url = `http://localhost:8085/api/game/start/${userId}`;
                    try {
                        const response = await axios.post(url);
                        const token = response.data; // The token received from the backend
                        if (token) {
                            // Navigate to the MainGame component with the token
                            navigate(`/${gameModeKey}/${token}`);
                        } else {
                            // Handle the case where no token is received
                            console.error('No token received');
                        }
                    } catch (error) {
                        // Handle errors: user not found, server error, etc.
                        console.error('Error starting game:', error);
                    }
                }
                    break;
                default:
                    break;
            }
        };
        
    // Do not edit anything down here unless you know whats going on :) -Vedi
        return (
            <Box sx={{
                height: '100vh',
                backgroundImage: 'linear-gradient(to bottom, white 2%, #EF9F9F 100%)', // Pink ombre background
                color: 'white',
                textAlign: 'center',
                p: 1
            }}>
            <Grid 
            spacing={3}
            style={{ height: '90vh' }} 
            alignItems="center" 
            justifyContent="center"
            container component="main" 
            sx={{ height: '100vh', justifyContent: 'center',}}
            >
                {Object.keys(gameModes).map((key, index) => (
                    <Grid item key={index}>
                        <Selection
                            text={gameModes[key].title}
                            onClick={() => handleClick(key)}
                            gameInfo={gameModes[key]}
                            imageUrl={gameModes[key].imageUrl}
                        />
                    </Grid>
                ))}
            </Grid>
            </Box>
        );
    };

export default StartGame;
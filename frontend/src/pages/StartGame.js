import React from 'react';
import Selection from '../components/Selection';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const StartGame = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();
    const userId = authUser.userId;

    //Stores game modes Change this and it will Reflect in the front end.
        const gameModes = {
            'Classic': {
                title: 'Classic',
                description: 'Guess the year of the song after listening to a 30 second snippet.'
            },
            'WIP': {
                title: 'Game Mode 2',
                description: 'Description for Game Mode 1'
            },
            'Square 3': {
                title: 'Game Mode 3',
                description: 'Description for Game Mode 1'
            },
            'Square 4': {
                title: 'Game Mode 4',
                description: 'Description for Game Mode 1'
            }
        }
        
        // Function to handle click events for different squares.
        const handleClick = (text) => {
            switch (text) {
                case 'Classic':
                    startGame(userId, text);
                    break;
                case 'WIP':
                    console.log("Method for Square 2 executed");
                    break;
                case 'Square 3':
                    console.log("Method for Square 3 executed");
                    break;
                case 'Square 4':
                    console.log("Method for Square 4 executed");
                    break;
                default:
                    break;
            }
        };


        const startGame = async (userId, gameModeKey) => {
            const url = `http://localhost:8085/api/game/start/${userId}`;

            try {
                const response = await axios.post(url);
                const token = response.data; // The token received from the backend
                if (token) {
                    // Navigate to the MainGame component with the token
                    navigate(`/maingame/${token}`);
                } else {
                    // Handle the case where no token is received
                    console.error('No token received');
                }
            } catch (error) {
                // Handle errors: user not found, server error, etc.
                console.error('Error starting game:', error);
            }
        };
        
    // Do not edit anything down here unless you know whats going on :) -Vedi
        return (
            <Grid 
            spacing={3}
            style={{ height: '100vh' }} 
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
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

export default StartGame;
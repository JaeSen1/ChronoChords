import React, { useState } from 'react';
import { Paper, ButtonBase, Typography, IconButton, Modal, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Selection = ({ text, onClick, gameInfo, imageUrl }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonBase
                onClick={onClick}
                sx={{
                    width: 300,
                    height: 375,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden', // Prevents content from spilling out on scale
                    borderRadius: '20px', // Rounded corners
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent white
                    boxShadow: 3,
                    '&:hover': {
                        transform: 'scale(1.15)', // Slightly enlarges the selection on hover
                        transition: 'transform 0.3s',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Darkens on hover
                        boxShadow: 140
                    },
                    position: 'relative',
                    border: '1px solid black'
                }}
            >
                <Paper
                    elevation={6}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#EF9F9F',
                        backgroundImage: `url(${imageUrl})`, // Set the background image
                        backgroundSize: 'cover', // Cover the entire area of the component
                        backgroundPosition: 'center', // Center the image
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <IconButton sx={{marginTop: -42, marginRight: 32, '& svg': { fontSize: '2rem'}}} onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the square's main onClick
                    handleOpen();
                    }}>
                    <InfoIcon />
                    </IconButton>
                </Paper>
            </ButtonBase>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="game-info-modal"
                aria-describedby="game-info-description"
            >
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20, outline: 'none' }}>
                    <Typography id="game-info-modal" variant="h6" component="h2">
                        {gameInfo.title}
                    </Typography>
                    <Typography id="game-info-description" sx={{ mt: 2 }}>
                        {gameInfo.description}
                    </Typography>
                    <ButtonBase onClick={handleClose}>Close</ButtonBase>
                </Box>
            </Modal>
        </>
    );
};

export default Selection;

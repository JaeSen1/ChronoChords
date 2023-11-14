import React, { useState } from 'react';
import { Paper, ButtonBase, Button, Typography, IconButton, Modal, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Selection = ({ text, onClick, gameInfo }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ButtonBase
                onClick={onClick}
                style={{
                    width: 200,
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid black', // Black border
                }}
            >
                <Paper
                    elevation={5}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#EF9F9F',
                    }}
                >
                    <Typography>
                        {text}
                    </Typography>
                    <IconButton onClick={(e) => {
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
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </>
    );
};

export default Selection;

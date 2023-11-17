import React from 'react';
import { Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const errorDetails = location.state?.errorDetails || 'No additional error details';
    const errorMessage = location.state?.errorMessage || '404 An unknown error occurred';

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Error: {errorDetails}
                    </Typography>
                    <Button variant="contained" onClick={handleBack} sx={{ mt: 3, mb: 2, backgroundColor: '#EF9F9F', '&:hover': { backgroundColor: '#EF9F9F' } }}>
                        Go Back
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ErrorPage;

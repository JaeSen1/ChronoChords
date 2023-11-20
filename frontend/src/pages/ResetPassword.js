import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Retrieve the reset token from the URL

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get(`http://localhost:8085/api/v1/user/validate-reset-token?token=${token}`);
            } catch (err) {
                console.log(err);
                navigate('/error', { 
                    state: { 
                        errorMessage: err.message || 'An unexpected error occurred',
                        errorDetails: err.response?.data || 'No response data'
                    } 
                });
            }
        };
        if (token) {
            validateToken();
        } else {
            navigate('/error', { state: { error: 'Token does not exist' } });
        }
    }, [token, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }
        try {
            const params = new URLSearchParams();
            params.append('token', token);
            params.append('newPassword', newPassword);
    
            await axios.post("http://localhost:8085/api/v1/user/reset-password", params);
            navigate('/login');
        } catch (err) {

        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                error={Boolean(errors.newPassword)}
                                helperText={errors.newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#EF9F9F', '&:hover': { backgroundColor: '#EF9F9F' } }}
                            >
                                Reset Password
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/login" style={{ color: '#EF9F9F' }} variant="body2">
                                        Back to login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

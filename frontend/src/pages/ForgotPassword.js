import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            ChronoChords
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
}

const defaultTheme = createTheme();

export default function ForgotPassword() {
const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const validate = () => {
    let tempErrors = {};
    if (!validateEmail(email)) tempErrors.email = "Email is not valid";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
        const params = new URLSearchParams();
        params.append('email', email);
        await axios.post("http://localhost:8085/api/v1/user/forgot-password", params);
        navigate('');
    } catch (err) {
        if (err.response) {
            // Backend returned an error response.
            if (err.response.data && err.response.data.errors) {
              setErrors(err.response.data.errors);
            } else if (err.response.data && err.response.data.message) {
              // For generic error messages not associated with specific fields.
              setErrors(prevErrors => ({ ...prevErrors, form: err.response.data.message }));
            } else {
              // Fallback error message
              setErrors(prevErrors => ({ ...prevErrors, form: 'An unexpected error occurred.' }));
            }
          } else if (err.request) {
            // The request was made but no response was received
            setErrors(prevErrors => ({ ...prevErrors, form: 'No response was received from the server.' }));
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrors(prevErrors => ({ ...prevErrors, form: 'There was an error in the request: ' + err.message }));
          }     
    } 
}
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
              Forgot Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
                onChange={(event) => setEmail(event.target.value)}
              />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting} // Disable the button while submitting
                sx={{ mt: 3, mb: 2, backgroundColor: '#EF9F9F', '&:hover': { backgroundColor: '#EF9F9F' } }}
            >
             {isSubmitting ? 'Sent...' : 'Send Reset Link'}
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login"  style={{ color: '#EF9F9F' }} variant="body2">
                    Back to login
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

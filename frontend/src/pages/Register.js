import { useState } from "react";
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

export default function SignInSide() {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const validate = () => {
    let tempErrors = {};
    // Simple validation criteria, can be replaced with more complex validators
    if (!username.trim()) tempErrors.username = "Username is required";
    if (username.length < 3) tempErrors.username = "Username must be at least 3 characters long";
    if (!validateEmail(email)) tempErrors.email = "Email is not valid";
    if (password.length < 4) tempErrors.password = "Password must be at least 4 characters long";
    if (password !== reenteredPassword) tempErrors.reenteredPassword = "Passwords must match";

    setErrors(tempErrors);

    // Form is valid if the errors object has no properties
    return Object.keys(tempErrors).length === 0;
  };

  async function save(event) {
    event.preventDefault();

    // Call validate function and prevent submission if validation fails
    if (!validate()) {
      return;
    }

    try {
      await axios.post("http://localhost:8085/api/v1/user/save", {
        username: username,
        email: email,
        password: password,
      });
      navigate('/login');
    }
    catch (err) {
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: "url(https://source.unsplash.com/a-drawing-on-the-sand-bj3hTj6daIM)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={save} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="user"
                autoFocus
                error={Boolean(errors.username)}
                helperText={errors.username}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <TextField // 2. New TextField for confirm password
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="reenter"
                label="Reenter Password"
                type="password"
                id="reenter"
                autoComplete="current-password"
                error={Boolean(errors.reenteredPassword)}
                helperText={errors.reenteredPassword}
                onChange={(event) => {
                  setReenteredPassword(event.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: '#EF9F9F',
                  '&:hover': {
                    backgroundColor: '#EF9F9F',
                  }
                }}
              >
                Create Account
              </Button>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

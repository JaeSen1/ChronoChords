import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '../components/Menu'
import { useAuth } from '../AuthContext';

export default function Appbar() {
  const { authUser, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1B1B1B' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left section (if you have icons or buttons to the left) */}
          <Box
            className="Menu-container"
            sx={{
              position: 'relative', // this ensures z-index is respected by the Menu
              zIndex: 1300, // this value should be higher than other elements, MUI uses 1200 for AppBar, so 1300 ensures it's above
            }}
          >
            <Menu/>
          </Box>
          {/* Center section (for the title) */}
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', paddingBottom: 2}}>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Monomaniac One, sans-serif', fontSize: '4rem' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>ChronoChords</Link>
            </Typography>
          </Box>

          {/* Right section (if you have icons or buttons to the right) */}
          <Box>
            <div>
              {authUser ? (
                <div>
                  <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}><Button color="inherit">{authUser.username}'s Profile</Button></Link>
                  <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(logout)}><Button color="inherit">Logout</Button></Link>
                </div>
              ) : (
                <div>
                  <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}><Button color="inherit">Register</Button></Link>
                  <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}><Button color="inherit">Login</Button></Link>
                </div>
              )}
            </div>
          </Box>
          
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}



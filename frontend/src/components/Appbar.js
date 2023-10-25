import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1B1B1B' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left section (if you have icons or buttons to the left) */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Center section (for the title) */}
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', paddingBottom: 2}}>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Monomaniac One, sans-serif', fontSize: '4rem' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>ChronoChords</Link>
            </Typography>
          </Box>

          {/* Right section (if you have icons or buttons to the right) */}
          
          <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}><Button color="inherit">Login</Button></Link>
          
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}



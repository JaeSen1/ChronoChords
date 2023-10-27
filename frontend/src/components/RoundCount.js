import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function RoundCount({ round }) {
    return (
        <>
            {/* White line separator */}
            <Box
              sx={{
                width: '100%',
                borderBottom: '1px solid #FFFFFF', // this creates the white line
              }}
            />
            {/* Round count section */}
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#1B1B1B', // same as AppBar's color
                py: .2, // Padding vertical for spacing
              }}
            >
              <Typography
                variant="subtitle1" // smaller text size compared to "h6"
                component="div"
                sx={{
                  textAlign: 'center', // Center the text horizontally
                  color: '#fff', // Text color, adjust as needed
                }}
              >
                Round {round} of 5
              </Typography>
            </Box>
        </>
    );
}

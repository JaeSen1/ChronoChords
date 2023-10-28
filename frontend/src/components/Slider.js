import * as React from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import { useState } from 'react';

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 1910,
  },
  {
    value: 1920,
  },
  {
    value: 1930,
  },
  {
    value: 1940,
  },
  {
    value: 1950,
  },
  {
    value: 1960,
  },
  {
    value: 1970,
  },
  {
    value: 1980,
  },
  {
    value: 1990,
  },
  {
    value: 2000,
  },
  {
    value: 2010,
  }
];

const normalButtonStyle = {
  backgroundColor: '#1B1B1B', 
  color: '#FFFFFF',
};

const disabledButtonStyle = {
  backgroundColor: '#D3D3D3',
  color: '#A9A9A9',
};

function valuetext(value) {
    return `${value}`;
  }

const TimelineSlider = styled(Slider)(({ theme, correctGuess }) => ({
  color: 'grey',
  width: 1200,
  height: 43,
  marginTop: 150,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: correctGuess ? '#B4EF9F' : '#EF9F9F', // dynamic color based on the correct guess
  },
  '& .MuiSlider-thumb': {
    height: 65,
    width: 16,
    borderRadius: '1px',
    backgroundColor: '#1B1B1B',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#1B1B1B',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
    
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'black',
    height: 'inherit',
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
  '& .actualYearMarkLabel': { 
    // This class is for the actual year's label specifically
    position: 'absolute', // Keep as absolute to position in relation to the nearest positioned ancestor
    top: '45px', // Positioning the label below the slider (you may need to adjust this value based on your layout)
    left: '50%', // Centering the label relatively to its parent
    transform: 'translateX(-50%)', // Ensures the centering by offsetting half of the element's width
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1.2,
    fontSize: 12,
    width: 40, 
    height: 24, 
    borderRadius: '3px', 
    backgroundColor: '#1B1B1B',
    color: '#FFFFFF', 
    textAlign: 'center',
    padding: '4px',
    zIndex: 1, // Ensure the label is above other elements, adjust if needed based on your stacking context
    '&:before': { // Changed to :before to position it above the label
      // Pseudo-element for the 'speech bubble' arrow
      content: '""',
      position: 'absolute',
      bottom: '100%', // Positioned at the top of the parent element
      left: '50%',
      transform: 'translateX(-50%)',
      borderWidth: '6px', 
      borderStyle: 'solid',
      borderColor: 'transparent transparent #1B1B1B transparent', // Arrow pointing up
      // Adjust colors and box-shadow as needed
    },
  },
  '& .actualYearMark': { // We are targeting the specific style of the actualYear's mark
    height: 8, // making it more prominent
    width: 2,
    backgroundColor: 'blue', // making it different and noticeable, change color as needed
  },

}));


export default function CustomizedSlider(props) {

  const { value, onChange, onSubmit, onNextRound, finalRound, locked, actualYear } = props;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const correctGuess = locked && value === actualYear;

  const handleClick = () => {
    if (!isSubmitted) {
      onSubmit(); // This is called when the user submits their guess
      setIsSubmitted(true);
    } else {
      onNextRound(); // This is called to proceed to the next round
      setIsSubmitted(false); // Reset for the next question
    }
  };

  let buttonText = isSubmitted ? 'Next Round ->' : 'Submit';
  if (finalRound && isSubmitted) {
    buttonText = 'No More Rounds';
  }

  let actualYearMark = [];
  if (locked && actualYear) {
    const Icon = correctGuess ? CheckIcon : CloseIcon; // Choose the icon based on 'correctGuess'.
    const iconColor = correctGuess ? 'green' : 'red'; // Choose the color based on 'correctGuess'.
    const iconTopPosition = correctGuess ? '-110px' : '-50px'; // Adjust the top position based on 'correctGuess'.

    actualYearMark = [{
      value: actualYear,
      label: (
        <div style={{ position: 'relative', width: 60, height: 50 }}> {/* Increased height to accommodate icon */}
          <Icon style={{ 
            color: iconColor, 
            position: 'absolute', 
            top: iconTopPosition,  // Conditional positioning here
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',  // Optional: adjust icon size as necessary
          }} />
          <div className="actualYearMarkLabel" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            {correctGuess ? <span style={{ fontSize: '10px' }}>PERFECT</span> : actualYear.toString()}
          </div>
        </div>
      ),
      className: "actualYearMark",
    }];
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex',
        flexDirection: 'column', // stacks children vertically
        alignItems: 'center', // centers children along the cross-axis, which is horizontal for a column-direction flex container
        justifyContent: 'center', // centers children along the main-axis (vertically, in this case)
      }}
    >
    <Box sx={{ m: 3 }} />
      <TimelineSlider
        valueLabelDisplay="on"
        value={value}
        onChange={onChange} // <- here it's used, it will call handleSliderChange from MainGame
        marks={locked ? actualYearMark : marks}
        disabled={locked} // this makes the slider unmovable when it's true
        step={1}
        min={1900}
        max={2023}
        aria-label="slider"
        getAriaValueText={valuetext}
        correctGuess={correctGuess} // <-- passing the new prop here
      />
      {/* The Button component is now a direct child of the flex container, so it will be centered horizontally. */}
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          style={finalRound && isSubmitted ? disabledButtonStyle : normalButtonStyle}
          onClick={handleClick}
          disabled={finalRound && isSubmitted} // Disable the button if it's the final round and the round is submitted
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}
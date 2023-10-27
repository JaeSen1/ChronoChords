import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

function valuetext(value) {
    return `${value}`;
  }

const TimelineSlider = styled(Slider)({
  color: 'grey',
  width: 1200,
  height: 43,
  marginTop: 150,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#EF9F9F'
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
  }
});


export default function CustomizedSlider(props) {

  const { value, onChange, onSubmit, onNextRound, finalRound, locked, actualYear } = props;
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Conditionally create marks to show the actual year's position on the slider
  let actualYearMark = [];
  if (locked && actualYear) {
    actualYearMark = [{
      value: actualYear,
      label: `${actualYear}`,  // This will display the year above the thumb
    }];
  }

  return (
    <Box 
      sx={{ 
        width: '80%', 
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
      />
      {/* The Button component is now a direct child of the flex container, so it will be centered horizontally. */}
      <Box sx={{ mt: 2 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClick}
        disabled={finalRound && isSubmitted} // Disable the button if it's the final round and the round is submitted
      >
        {buttonText}
      </Button>
      </Box>
    </Box>
  );
}
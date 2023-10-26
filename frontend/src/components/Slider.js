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
    value: 1900,
  },
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
  },
  {
    value: 2023,
  }
];

function valuetext(value) {
    return `${value}`;
  }

const TimelineSlider = styled(Slider)({
  color: 'grey',
  width: 1200,
  height: 43,
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
});


export default function CustomizedSlider(props) {

  const { value, onChange, onSubmit } = props;

  // This function will be triggered when the "Submit" button is clicked.
  const handleSubmit = () => {
    onSubmit(); // Call the submit function passed from the parent component
  };

  return (
    <Box 
      sx={{ 
        width: '80%', 
        display: 'flex', // indicates we're using Flexbox
        flexDirection: 'column', // stacks children vertically
        alignItems: 'center', // centers children along the cross-axis, which is horizontal for a column-direction flex container
        justifyContent: 'center', // centers children along the main-axis (vertically, in this case)
      }}
    >
      <Box sx={{ m: 3 }} />
      <TimelineSlider
        valueLabelDisplay="on"
        value={value}
        onChange={onChange} // Set up an event handler to manage changes.
        step={1}
        marks={marks}
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
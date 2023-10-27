import React, { useState, useRef } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ReactPlayer from 'react-player';


const WallPaper = styled('div')( {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      background:
        'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      background:
        'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
      transform: 'rotate(30deg)',
    },
  });

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  paddingTop: 20,
  borderRadius: 16,
  width: 650,
  maxWidth: '100%',
  margin: 'auto',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.1)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 250,
  height: 250,
  marginBottom: 10,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  display: 'flex',           // added line
  justifyContent: 'center',  // added line
  alignItems: 'center',      // added line
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider({ url, songDetails, reveal, onMoreInfo }) {
  const playerRef = useRef(null);
  const theme = useTheme();
  const [duration, setDuration] = useState(0); // total duration of the audio
  const [position, setPosition] = useState(0); // current position of the audio
  const [volume, setVolume] = React.useState(0.3); // Volume is between 0 and 1

  // You can use the 'reveal' prop to decide whether to show song details or placeholders.
  const displayCover = songDetails.cover;
  const displayArtist = reveal ? songDetails.artist : '?????????';
  const displayTitle = reveal ? songDetails.title : '?????????';
  const displayAlbum = reveal ? songDetails.album : '?????????';

  const [isSeeking, setIsSeeking] = useState(false);

  // This handler updates the 'position' as the audio plays
  const handleProgress = (progress) => {
    // Only update the position if the user is NOT currently seeking.
    if (!isSeeking) {
      setPosition(progress.playedSeconds);
    }
  };

  // This handler updates the 'duration' once the audio is loaded
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // Adjust the position when the user drags the slider
  const handleSeekChange = (e, newValue) => {
  setIsSeeking(true); // User starts seeking
  setPosition(newValue); // Update the position immediately for responsiveness
};

  // Seek the position when the user stops dragging the slider
  const handleSeekMouseUp = (e, newValue) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newValue); // Seek the player to the new position
    }
    setIsSeeking(false); // Seeking is finished
  };

  const [paused, setPaused] = React.useState(true);

  function formatDuration(value) {
    const roundedValue = Math.floor(value);  // rounding down the time to display
    const minute = Math.floor(roundedValue / 60);
    const secondLeft = roundedValue - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <Box sx={{ width: '100%', overflow: 'hidden'}}>
    <WallPaper/>
      <Widget>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
          {/* flexDirection: 'row' will place your items side by side */}
          
          {/* Your cover image component - No changes here */}
          <CoverImage>
            {reveal ? (
              <img
                alt={displayTitle}
                src={displayCover}
              />
            ) : (
              <QuestionMarkIcon style={{ fontSize: 100 }} />
            )}
          </CoverImage>

          {/* Container for the text, you want this to take the rest of the space to the right */}
          <Box
            sx={{ 
              ml: 10,  // margin left to give some space between image and text
              flexGrow: 1,  // allow this box to grow and consume the remaining space in the flex container
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-start',  // content aligned to the start of the box
              minWidth: 0,  // ensures the box can shrink below its minimum content size if necessary
              position: 'relative',  // set position relative to allow absolute positioning within this box
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {displayArtist}
              </Typography>
              <Typography noWrap>
                <b>{displayTitle}</b>
              </Typography>
              <Typography noWrap letterSpacing={-0.25}>
                {displayAlbum}
              </Typography>
            </Box>

            {/* Positioned the button absolutely within the parent box, and moved it down */}
            <Box
              sx={{ 
                position: 'absolute',  // position the button absolutely
                bottom: '-100%',  // position at the bottom with offset to move it outside the container
                left: 0,  // position on the left side of the container
              }}
            >
              {reveal && (
                <Button variant="contained" style={{ backgroundColor: '#1B1B1B', color: '#FFFFFF', mt: 1 }} onClick={onMoreInfo}>
                  More Info
                </Button>
              )}
            </Box>
          </Box>
        </Box>
  
        <ReactPlayer
          ref={playerRef}
          url={url}
          progressInterval={50}
          playing={!paused} // play or pause the track based on 'paused' state
          onDuration={handleDuration} // get the duration of the audio
          onProgress={handleProgress} // get the current position of the audio
          volume={volume} // Control the player's volume
          width="0" // Setting width and height as 0 to hide the player's default UI
          height="0"
        />

        <Slider
          aria-label="time-indicator"
          size="small"
          step={0.01}
          value={position}
          min={0}
          max={duration} // Set maximum value as the duration of the audio
          onChange={handleSeekChange} // While dragging the slider
          onChangeCommitted={handleSeekMouseUp} // When the dragging ends
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            value={volume * 100} // Reflects the current volume as a percentage
            min={0} // Minimum volume is 0%
            max={100} // Maximum volume is 100%
            onChange={(_, newValue) => setVolume(newValue / 100)} // Update volume state when slider changes
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
}
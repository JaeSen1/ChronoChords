import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system'; // Import styled for the Image container


const ImageContainer = styled('div')({  // Style the image container
  height: '200px', // Or any other size
  width: '100%',
  marginBottom: '16px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%', // or choose a size that fits your needs
  maxWidth: '600px', // Avoid the modal getting too large on big screens
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Ensures the modal scrolls if content is too big
};

export default function BasicModal({ open, onClose, songData }) {
  
  const buttonStyle1 = {
    position:'absolute',
    top: '10px',
    right: '10px',
  };
  const buttonStyle2 = {
    top: '550px',

  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button style={{ position:'absolute', top: '10px', right: '10px' }} onClick={onClose}>Close</Button>

          {/* Song title and artist */}
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom="2">
            {songData.title} - {songData.artist}
          </Typography>

          {/* Album name */}
          <Typography variant="subtitle1" color="text.secondary" marginBottom="2">
            {songData.album}
          </Typography>

          {/* Cover image */}
          <ImageContainer style={{ backgroundImage: `url(${songData.cover})` }} />

          {/* Description section */}
          <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: 'break-word' }}>
            {songData.description} {/* Placeholder for real description */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '1000px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicModal({ open, onClose, songData }) {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>Close</Button>
        <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom="2">
          {songData.title} - {songData.artist}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" marginBottom="2">
          {songData.album}
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example"
          sx={{ 
            '.MuiTabs-flexContainer': {
            justifyContent: 'flex-end'
          }
        }}>
        <Tab label="Artist" />
        <Tab label="Song" />
        <Tab label="Year" />
        </Tabs>
      </Box>


        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          {songData.artistDescr}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {songData.description}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {songData.aboutYear}
        </TabPanel>
      </Box>
    </Modal>
  );
}
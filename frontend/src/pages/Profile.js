import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ProfilePage() {
    const { authUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const initialState = {
      username: '',
      status: '',
      description: '',
    };

    let userStats = {
      highestScore: 1200,
      gamesPlayed: 50,
      averageScore: 850,
    };

    // useState should be initialized with initialState if you want to reset to these values
    const [profile, setProfile] = useState(initialState);
    const userId = authUser.userId;

    // Array of avatar URLs
    const avatarUrls = [
      '/avatars/avatar4.png',
      '/avatars/avatar5.png',
      '/avatars/avatar6.png',
      '/avatars/avatar7.png',
      '/avatars/avatar8.png'
      // Add more file paths here
    ];

    const [avatarIndex, setAvatarIndex] = useState(0);

    // Function to go to the next avatar
    const nextAvatar = () => {
      const newIndex = (avatarIndex + 1) % avatarUrls.length;
      setAvatarIndex(newIndex);
      setProfile(prevState => ({ ...prevState, avatarUrl: avatarUrls[newIndex] }));
    };

    const previousAvatar = () => {
      const newIndex = (avatarIndex - 1 + avatarUrls.length) % avatarUrls.length;
      setAvatarIndex(newIndex);
      setProfile(prevState => ({ ...prevState, avatarUrl: avatarUrls[newIndex] }));
    };

    useEffect(() => {
      fetch(`http://localhost:8085/api/v1/user/profile/${userId}`)
        .then(response => response.json())
        .then(data => {
          setProfile({
            ...data,
            avatarUrl: data.avatarUrl || avatarUrls[0] // Use existing avatar URL or default to the first one
          });
          // Set the avatarIndex based on the fetched avatarUrl
          const avatarIndex = avatarUrls.findIndex(url => url === data.avatarUrl);
          setAvatarIndex(avatarIndex !== -1 ? avatarIndex : 0);
        })
        .catch(error => console.error('Error:', error));
    }, [userId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfile(prevState => ({ ...prevState, [name]: value }));
    };
    
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSaveChanges = () => {
      console.log('Profile data to save:', profile);
    
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile) // This includes the avatar URL
      };
    
      fetch(`http://localhost:8085/api/v1/user/profile/${userId}`, requestOptions)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.text(); // Parse the response as text, not as JSON
          })
          .then(text => {
              console.log('Success:', text); // Handle the text response
              // Additional success handling code here
          })
          .catch(error => {
              console.error('Error:', error); // Handle errors
          });
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row', // Set to 'row' to align cards horizontally
      alignItems: 'flex-start', // Align items to the start of the cross axis
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'white', // Smooth gradient background
      padding: 3, // Add some padding around the content
      gap: 2, // Add gap between items
    }}
  >
    <Stack direction="column" spacing={2} sx={{ maxWidth: 1200, width: '100%' }}>
      
    <Card
        sx={{
          mb: 4,
          maxWidth: 1900,
          width: '100%',
          backdropFilter: 'blur(40px)',
          background: '#EF9F9F',
          border: '3px solid pink', // greyish border
          boxSizing: 'border-box',
          borderRadius: '16px', // rounded corners
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px 0 rgba(0,0,0,0.3)',
          },
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                 {editMode && (
                    <IconButton onClick={previousAvatar} sx={{ position: 'absolute', left: -50, background: '#ef9f9f', '&:hover': { background: '#d88d8d' } }}>
                           <ArrowBackIosIcon />
                    </IconButton>
                    )}
                    <Avatar
                        src={avatarUrls[avatarIndex]}
                        alt="Profile"
                        sx={{ width: 220, height: 220, background: 'gray' }}
                    />
                     {editMode && (
                       <IconButton onClick={nextAvatar} sx={{ position: 'absolute', right: -50, background: '#ef9f9f', '&:hover': { background: '#d88d8d' } }}>
                           <ArrowForwardIosIcon />
                       </IconButton>
                      )}
                        </Box>
          <Typography variant="h4" sx={{ mb: 1, marginTop: 2 }}>
            {profile.username}
          </Typography>
          <Typography sx={{ mb: 1 }}>Status: {profile.status}</Typography>
          <Typography>Description: {profile.description}</Typography>
          <Button
                  variant="contained"
                  onClick={toggleEditMode}
                  sx={{
                  mt: 2, // Margin top
                  border: '1px solid pink',
                  background: '#ef9f9f',
                  '&:hover': {
                  background: '#d88d8d', // Slightly darker on hover
                 },
               }}
              >
                Edit Profile
              </Button>
        </CardContent>
      </Card>
      {editMode && (
      <Card //CARD For editing profile
        sx={{
          mb: 2,
          maxWidth: 1900,
          width: '100%',
          backdropFilter: 'blur(40px)',
          background: '#EF9F9F',
          border: '3px solid pink', // greyish border
          boxSizing: 'border-box',
          borderRadius: '16px', // rounded corners
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px 0 rgba(0,0,0,0.3)',
          },
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            name="status"
            label="Status"
            value={profile.status}
            onChange={handleInputChange}
            placeholder="Enter your status"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            name="description"
            label="Description"
            value={profile.description}
            onChange={handleInputChange}
            placeholder="Enter a short bio"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          </CardContent>
          <Button
          variant="text"
          onClick={handleSaveChanges}
          sx={{
            width: '100%',
            background: '#ef9f9f',
            color: 'black',
            transition: '0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05) translateY(-3px)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            },
          }}
        >
          Save Changes
        </Button>
      </Card>
      )}
      <Card
        sx={{
        mb: 4,
        flexGrow: 1,
        backdropFilter: 'blur(40px)',
        background: '#EF9F9F',
        border: '3px solid pink', 
        boxSizing: 'border-box',
        borderRadius: '16px',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px 0 rgba(0,0,0,0.3)',
           },
        }}
      >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'text.primary',
        }}
          >
          <Typography variant="h5" sx={{ mb: 1 }}>
              User Statistics
          </Typography>
            <Typography sx={{ mb: 1 }}>Highest Score: {userStats.highestScore}</Typography>
            <Typography sx={{ mb: 1 }}>Games Played: {userStats.gamesPlayed}</Typography>
            <Typography>Average Score: {userStats.averageScore}</Typography>
                </CardContent>
            </Card>
        <Card
          sx={{
            mb: 4,
            flexGrow: 1, // Allow the card to grow
            backdropFilter: 'blur(40px)',
            background: '#EF9F9F',
            border: '3px solid pink',
            boxSizing: 'border-box',
            borderRadius: '16px', // Rounded corners
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px 0 rgba(0,0,0,0.3)',
            },
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Recent Games
            </Typography>
            {/* Add content for recent games here */}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
  export default ProfilePage
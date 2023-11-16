import React, { useState, useRef } from 'react';
import '../App.css';


function ProfilePage() {
    const initialState = {
      username: '',
      status: '',
      description: '',
      img: '' // This will hold the image URL
    };
    
    // useState should be initialized with initialState if you want to reset to these values
    const [profile, setProfile] = useState(initialState);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfile(prevState => ({ ...prevState, [name]: value }));
      console.log("hi")
    };
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfile(prevState => ({ ...prevState, profilePic: event.target.result }));
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const fileInputRef = useRef();
  
    const handleSaveChanges = () => {
        console.log('Profile data to save:', profile);
      
        // Send a POST request to your server endpoint:
        fetch('http://localhost:8085/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Reset the form here if needed
          setProfile(initialState);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };
  
    return (
      <div className="profile-page-container">
        <div className="profile-page">
          {/* Top Box - Display */}
          <div className="profile-display card">
            <img
              src={profile.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-pic"
            />
            <h3 className='profile-page h3'>{profile.username}</h3>
            <p className='profile-page p'>Status: {profile.status}</p>
            <p className='profile-page p'>Description: {profile.description}</p>
          </div>
  
          {/* Bottom Box - Input */}
          <div className="profile-edit card">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="upload-btn"
              ref={fileInputRef}
            />
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
            <input
              type="text"
              name="status"
              value={profile.status}
              onChange={handleInputChange}
              placeholder="Enter your status"
            />
            <textarea
              name="description"
              value={profile.description}
              onChange={handleInputChange}
              placeholder="Enter a short bio"
            />
            <button onClick={handleSaveChanges} className="save-changes-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfilePage
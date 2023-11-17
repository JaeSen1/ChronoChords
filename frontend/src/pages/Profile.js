import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import '../App.css';


function ProfilePage() {
    const { authUser } = useAuth();

    const initialState = {
      username: '',
      status: '',
      description: '',
    };
    
    // useState should be initialized with initialState if you want to reset to these values
    const [profile, setProfile] = useState(initialState);
    const fileInputRef = useRef();

    const userId = authUser.userId;

    useEffect(() => {
      fetch(`http://localhost:8085/api/v1/user/profile/${userId}`)
        .then(response => response.json())
        .then(data => {
          setProfile({
            ...data
          });
        })
        .catch(error => console.error('Error:', error));
    }, [userId]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfile(prevState => ({ ...prevState, [name]: value }));
    };
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        // Store the file object in the state
        setProfile(prevState => ({ ...prevState, img: e.target.files[0] }));
    
        // You can still use FileReader to display the image preview
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfile(prevState => ({ ...prevState, profilePic: event.target.result }));
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
    
  
  
    const handleSaveChanges = () => {
      console.log('Profile data to save:', profile);
  
      // Construct the request options for PUT request
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
      };
  
      // Send a PUT request to your server endpoint
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
      <div className="profile-page-container">
        <div className="profile-page">
          {/* Top Box - Display */}
          <div className="profile-display card">
            <div className="profile-content">
              <img
                src={profile.profilePic || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="profile-pic"
              />
              <div className="profile-text">
                <h3 className='profile-page h3'>{profile.username}</h3>
                <p className='profile-page p'>Status: {profile.status}</p>
                <p className='profile-page p'>Description: {profile.description}</p>
              </div>
            </div>
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
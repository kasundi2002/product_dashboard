import React, { useState, useEffect } from 'react';
import './../styles/ProfilePage.css';
import profilePicture from './../assets/profile.jpg';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'admin@gmail.com',
    bio: 'Im the admin',
    profilePicture: profilePicture
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h1 className="profile-name">{user.name}</h1>
      </div>
      <div className="profile-details">
        <p className="profile-email"><strong>Email:</strong> {user.email}</p>
        <p className="profile-bio"><strong>Bio:</strong> {user.bio}</p>
      </div>
      <div className="profile-actions">
        <button className="edit-button">Edit Profile</button>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;


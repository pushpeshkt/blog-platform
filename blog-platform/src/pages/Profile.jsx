import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Profile</h2>
      <p><strong>User ID:</strong> {user.$id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Additional profile info can be displayed here */}
    </div>
  );
}

export default Profile;

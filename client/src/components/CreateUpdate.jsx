import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateUpdate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const { listingId } = useParams();
  const navigate = useNavigate();
  
  // Assuming you store the token in Redux
  const token = useSelector((state) => state.token);
  // If you're using localStorage instead, you would do:
  // const token = localStorage.getItem('userToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/updates/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use the token here
        },
        body: JSON.stringify({
          listingId,
          title,
          description,
          videoLink,
        }),
      });

      if (response.ok) {
        navigate(`/`);
      } else {
        const errorData = await response.json();
        console.error('Failed to create update:', errorData.message);
        // You might want to show an error message to the user here
      }
    } catch (err) {
      console.error('Error creating update', err);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-update">
        <h1>Create Update</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Update Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Update Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="url"
            placeholder="YouTube Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
          />
          <button type="submit">Create Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateUpdate;
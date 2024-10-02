import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateUpdate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [supportingDocs, setSupportingDocs] = useState([]);
  const { listingId } = useParams();
  const navigate = useNavigate();
  
  // Assuming you store the token in Redux
  const token = useSelector((state) => state.token);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can only upload a maximum of 5 files.');
      return;
    }
    setSupportingDocs(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('listingId', listingId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoLink', videoLink);
    supportingDocs.forEach((file) => {
      formData.append('supportingDocuments', file);
    });

    try {
      const response = await fetch('http://localhost:3001/updates/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        navigate(`/`);
      } else {
        const errorData = await response.json();
        console.error('Failed to create update:', errorData.message);
        alert('Failed to create update. Please try again.');
      }
    } catch (err) {
      console.error('Error creating update', err);
      alert('An error occurred. Please try again.');
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
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.doc,.docx"
          />
          <small>You can upload up to 5 PDF or Word documents (max 5MB each)</small>
          <button type="submit">Create Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateUpdate;
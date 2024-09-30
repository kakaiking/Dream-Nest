import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateDetails = () => {
  const [update, setUpdate] = useState(null);
  const { updateId } = useParams();

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:3001/updates/${updateId}`);
        const data = await response.json();
        setUpdate(data);
      } catch (err) {
        console.error("Failed to fetch update details", err);
      }
    };

    fetchUpdate();
  }, [updateId]);

  if (!update) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="update-details">
        <ReactPlayer url={update.videoLink} />
        <h1>{update.title}</h1>
        <p>{update.description}</p>
      </div>
      <Footer />
    </>
  );
};

export default UpdateDetails;
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
        <div className="updateTitle" style={{ textAlign: "center", margin: "20px auto" }}>
          <h1>{update.title}</h1>
        </div>
        <div className="vid" >
          <ReactPlayer url={`${update.videoLink}?modestbranding=1&showinfo=0&rel=0`} style={{ margin: "30px auto " }} />
        </div>
        <div className="updateDeets" style={{width: "90%", height: "auto", backgroundColor: '#fff', margin: '0 auto', borderRadius: '10px', padding: '10px'}}>
          <div className="desctitle" style={{ width: '65%', margin: "0 auto 20px auto", textAlign: "center" }}>
            <h3><u> Description:</u></h3>
          </div>
          <div className="updateP" style={{ width: '85%', height: "500px", margin: "0 auto", textAlign: "center" }}>
            <p>{update.description}</p>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default UpdateDetails;
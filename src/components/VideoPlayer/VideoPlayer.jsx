
import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from "react-player";
import Modal from "react-modal";
const VideoPlayer = ({videoUrls}) => {
    const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");

  const openVideo = (url) => {
    setVideoUrl(url);
    setIsVideoOpen(true);
  };

  return (
    <>
        <div>
      <div className="chat-messages">
          <div  onClick={() => openVideo(videoUrls)} style={{ cursor: "pointer" }}>
            <video style={{borderRadius :'20px'}} width="200" height="130" controls>
              <source src={videoUrls} type="video/mp4"/>
              <source src={videoUrls} type="video/ogg"/>
            </video>
          </div>
      </div>

      <Modal
        isOpen={isVideoOpen}
        onRequestClose={() => setIsVideoOpen(false)}
        contentLabel="Video Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Overlay background color
            zIndex: 9999, // To ensure it's on top of everything
          },
          content: {
            maxWidth: "80%", // Adjust max width of the modal
            maxHeight: "80%", // Adjust max height of the modal
            margin: "auto",
            padding: 0,
            border: "none",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
             borderRadius :'20px'
          },
        }}
      >
        <ReactPlayer url={videoUrl} playing controls width="100%" height="100%" />
        <button
          onClick={() => setIsVideoOpen(false)}
          className='btn  rounded-pill text-white '
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          X
        </button>
      </Modal>
    </div>
    </>
  )
}

export default VideoPlayer

import React, { useState } from 'react';
import Modal from 'react-modal';

const ImageViewer = ({ imageUrls }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const openImage = (url) => {
    setImageUrl(url);
    setIsImageOpen(true);
  };

  return (
    <>
      <div>
        <div className="chat-messages">
          <div onClick={() => openImage(imageUrls)} style={{ cursor: 'pointer' }}>
            <img style={{borderRadius :'20px'}} src={imageUrls} alt="Thumbnail" width="200" height="130" />
          </div>
        </div>

        <Modal
          isOpen={isImageOpen}
          onRequestClose={() => setIsImageOpen(false)}
          contentLabel="Image Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.2)', // Overlay background color
              zIndex: 9999, // To ensure it's on top of everything
              borderRadius :'20px',
             
            },
            content: {
              maxWidth: '80%', // Adjust max width of the modal
              maxHeight: '80%', // Adjust max height of the modal
              margin: 'auto',
               padding: '30px',
              border: 'none',
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius :'20px'
            },
          }}
        >
          <img src={imageUrl} alt="Full size" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <button
            onClick={() => setIsImageOpen(false)}
            className="btn rounded-pill text-white"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            X
          </button>
        </Modal>
      </div>
    </>
  );
};

export default ImageViewer;

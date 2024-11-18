import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ChatNotification = ({ userId }) => {
  const [lastMessageId, setLastMessageId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get-unread-messages`, {
          params: { to_user_id: userId },
        });

        if (response.data && response.data.id) {
          if (response.data.id !== lastMessageId) {
            setLastMessageId(response.data.id); // Update the latest message ID
            if(response.data.msg.length!=0)
            {
              toast(
                <div>
                  <strong>{response.data.name}</strong>
                  <p>{response.data.msg}</p>
                </div>,
                {
                  position: "top-left",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            }
        
            setNotification({
              from: response.data.from_user_id,
              message: response.data.msg || "You have a new message!",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [userId, lastMessageId]);

  return (
    <div>
    </div>
  );
};

export default ChatNotification;

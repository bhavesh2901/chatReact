import React, { useState, useEffect } from "react";
import './Landingpage.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landingpage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
     <motion.div
      style={{
        width: 50,
        height: 50,
        backgroundColor: "skyblue",
        borderRadius: "50%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      animate={{
        x: cursorPosition.x - 25,  // Offset to center the element on the cursor
        y: cursorPosition.y - 25,  // Offset to center the element on the cursor
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    ><img src="/assets/robot.gif" style={{borderRadius:'50%'}} height={150} width={150}></img>
      </motion.div>
      <div className='bg-my landingpages'>
        <div class="maindiv">
          
          <div className='menus'>
          </div>
            <div class="mobile">
              <div class="head">
                <div class="notch"></div>
                <div class="profilebox">
                  <div class="left">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                    <div class="profile">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVE4qKZJ7M8L7a9YYRc5ucebwIxXKaAWmFg&s" alt="dp"/>
                      <div class="pdetail">
                        <h3>Samuel Green</h3>
                        <p>Available to Walk</p>
                      </div>
                    </div>
                  </div>
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
              </div>
              <div class="chatbox">
                <div class="eachmessage received animate">
                  <p>That sounds great. I’d be happy with that.</p>
                </div>
                <div class="eachmessage received animate">
                  <p>Could you send over some pictures of your dog, please?</p>
                </div>
                <div class="eachmessage imgbox">
                  <img class="animate" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s" alt="dog1"/>
                  <img class="animate" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_KhBpdDaEXt_9k9Ba8NeJtcmmD1lyDRZ6BmDMlIxJg5XQT9BxgU0RSFqHAhVQyOrS1No&usqp=CAU" alt="dog2"/>
                  <img class="animate" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_KhBpdDaEXt_9k9Ba8NeJtcmmD1lyDRZ6BmDMlIxJg5XQT9BxgU0RSFqHAhVQyOrS1No&usqp=CAU" alt="dog3"/>
                </div>
                <div class="eachmessage sent animate">
                  <p>Here are a few pictures. She’s a happy girl!</p>
                </div>
                <div class="eachmessage sent animate">
                  <p>Can you make it?</p>
                </div>
                <div class="eachmessage received animate">
                  <p>She looks so happy! The time we discussed works. How long shall I take her out for?</p>
                </div>
                <div class="deal animate">
                  <div class="det">
                    <input type="radio" name="plan"/>
                    <p>30 minute walk</p>
                  </div>
                  <p class="price">$29</p>
                </div>
                <div class="deal animate">
                  <div class="det">
                    <input type="radio" name="plan"/>
                    <p>1 hour walk</p>
                  </div>
                  <p class="price">$49</p>
                </div>
            </div>
            <div class="sendbox">
              <input type="text" placeholder="Type a message…"/>
              <button class="submit"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
            </div>
            </div>
            <div class="text">
              <h1>Simple booking</h1>
              <p>Stay in touch with our dog walkers through the chat interface. This makes it easy to 
                discuss arrangements and make bookings. Once the walk has been completed you can rate 
                your walker and book again all through the chat.</p>
                <button className='btn btn-primary mt-3 rounded-pill'><Link className='text-white' to='/loginsignup'>Login</Link></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Landingpage

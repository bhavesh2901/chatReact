import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need axios to make API requests
import './FollowBtn.css';

const FollowBtn = ({ currentUserId, targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if the current user already follows the target user
  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/follow/status/${currentUserId}/${targetUserId}`);
        setIsFollowing(response.data.isFollowing); // Assume response has `isFollowing` field
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    checkIfFollowing();
  }, [currentUserId, targetUserId]);

  // Follow handler
  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:3000/api/follow`, {
        follower_id: currentUserId,
        user_id: targetUserId,
      });
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  // Unfollow handler
  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:3000/api/unfollow`, {
        follower_id: currentUserId,
        user_id: targetUserId,
      });
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
      <button
        className={`btn  mx-3  p-1 ${isFollowing ? 'border border-danger text-black unfollowbtn' : 'border border-success text-black followBtn'}`}
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? <i class="fa-solid fa-user-minus text-white"></i> : <i class="fa-solid fa-user-plus text-white"></i>}
      </button>
  );
};

export default FollowBtn;

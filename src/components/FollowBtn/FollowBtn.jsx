import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need axios to make API requests
import './FollowBtn.css';
import { UserProvider ,useUser } from '../../UserContext';
const FollowBtn = ({ currentUserId, targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  let fullname = '';
  let name = '';
  let UserID = '';
  let email = '';
  let userPhone = '';
  let userPhoto = '';
  let school = '';
  let collage = '';
  let City = '';
  let maritalstatus = '';
  let bippic = '';
  let joining = '';
  let gender = '';
  let msthem = ''; 
  let mscolor = ''; 
  const { user } = useUser();
  if (user) {
      fullname =   user['user_profile']
      name =    user['name']
      UserID =   user['id']
      email =   user['email']
      userPhone =   user['mobail']
      userPhoto =   user['pro_pic']
      school =    user['bio_pic']
      collage =   user['collage']
      City =   user['city']
      maritalstatus =   user['marital_status']
      bippic =    user['bio_pic']
      joining =   user['createat']
      gender =   user['gender']
      msthem =   user['msthem']
      mscolor =   user['mscolor']
  }
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

      try {
        await axios.post('http://localhost:3000/api/sendmessage', {
          senderid : UserID,
          receiverid : targetUserId,
          messageText: 'hii lets connect'+fullname
        });
      } catch (error) {
       console.log(error);
      }
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

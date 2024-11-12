import React, { useState ,useEffect } from 'react';
import './ChatApp.css'; 
import Header from '../Header/Header';
import axios from 'axios';
import { UserProvider ,useUser } from '../../UserContext';
import Chatcontainer from '../../components/VideoPlayer/VideoPlayer';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Fade, Zoom } from 'react-awesome-reveal';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar';
import { TwitterPicker,  AlphaPicker ,BlockPicker ,ChromePicker, CirclePicker ,CompactPicker, GithubPicker, HuePicker ,MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker} from 'react-color';
import { useDropzone } from 'react-dropzone';
import FollowBtn from '../../components/FollowBtn/FollowBtn';

const ChatApp = () => {
    const [showBox, setShowBox] = useState(false);
    const { user } = useUser();
    const [followuser,setFollowuser] = useState([]);
    const [followingId,setFollowingId] = useState([]);
    const [userbyuseriddata,setUserbyuseriddata] = useState([]);
    const [messageText,setMessageText] = useState('');
    const [messagetheam,setMessagetheam] = useState('');
    const [fetchUser,setFetchUser] = useState('');

    const handleChatListClick = () => {
      setShowBox(true);
    };
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
    
      setFile(e.target.files[0]);
    };
      const lightColors = [
        "#FFDFDF", "#FFE6E6", "#FFE0CC", "#FFFFCC", "#E6FFE6",
        "#E6FFFF", "#D9F2FF", "#D9D9FF", "#F2D9FF", "#FFD9F2"
      ];
      

    const [userchat, setUserchat] = useState([]);
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
  
    const handleChatIconClick = () => {
      setShowBox(false);
    };
   
  
    setTimeout(() => {
        const divs3 = document.getElementsByClassName("repaly"); // Remove the dot prefix
        Array.from(divs3).forEach(div3 => {
        const pElement = div3.querySelector("p"); // Select the <p> element inside each .repaly
        if (pElement) {
            pElement.style.background = mscolor; // Set the background color on <p>
        }
        });
    }, 1000);

    const setBodyBackgroundColor =  async ()=>
    {
        if(messagetheam.length!==0)
        {
            const divs = document.getElementsByClassName("chat-area");
            Array.from(divs).forEach(div => {
              div.style.backgroundColor =messagetheam ;
            });
            
            try {
                await axios.post('http://localhost:3000/api/chatTheam', {
                    UserID : UserID,
                    theme : messagetheam,
                });
                } catch (error) {
                console.error('Error submitting rating:', error);
                toast('❌ SOMETHING WRONG', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                }
        }
       
    }
  
    const loadChat = async (id) => {
      
        setTimeout(() => {
            const divs3 = document.getElementsByClassName("repaly"); // Remove the dot prefix
            Array.from(divs3).forEach(div3 => {
            const pElement = div3.querySelector("p"); // Select the <p> element inside each .repaly
            if (pElement) {
                pElement.style.background = mscolor; // Set the background color on <p>
            }
            });
        }, 500);
            
     
        try {
            const response = await axios.get(`http://localhost:3000/api/userByuserid/${id}`);
            setUserbyuseriddata(response.data[0]);
        } catch (error) {
            console.error('Error fetching user chat status:', error);
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/userchat/${UserID}/${id}`);
            setUserchat(response.data);
        } catch (error) {
            console.error('Error fetching user chat status:', error);
        }      
    };

    useEffect(() => {
        if (followingId) {
            const intervalId = setInterval(() => {
                loadChat(followingId); 
                fetchfollouser();
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [followingId]);


    const fetchfollouser = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/followlistuser/${UserID}`);
          setFollowuser(response.data); // Assuming the API returns { isInWishlist: true/false }
        } catch (error) {
          console.error('Error follouser wishlist status:', error);
        }
      };
  
      // Fetch the wishlist status on component mount
    
      useEffect(() => {
        fetchfollouser();
      }, [UserID]);

    const sendMessge = async (id) => 
    {
        var formData ='';
         formData = new FormData();
        formData.append('image', file);
        if(formData)
        {
            axios.post(`http://localhost:3000/api/uploadphoto/${UserID}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                toast.success('Upload successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setFile(null);
                console.log('Image uploaded successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
        }
       
        if(id!='' && messageText!=''){
            try {
              await axios.post('http://localhost:3000/api/sendmessage', {
                senderid : UserID,
                receiverid : id,
                messageText: messageText
              });
              setMessageText('');
              loadChat(id);
            } catch (error) {
              console.error('Error submitting rating:', error);
              toast('❌ SOMETHING WRONG', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
    }

    
    const fetchuser = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/AlluserByUser/${UserID}`);
          setFetchUser(response.data); // Assuming the API returns { isInWishlist: true/false }
        } catch (error) {
          console.error('Error AlluserByUser:', error);
        }
      };
  
      // Fetch the wishlist status on component mount
    
      useEffect(() => {
        fetchuser();
      }, [UserID]);
  return (
    <>
     <Header/>
    <div className='container'>
        <section class="message-area mt-2">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="chat-area">
                            <div class="chatlist">
                                <div class="modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="chat-header">
                                            <div class="msg-search">
                                                <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search" aria-label="search"/>
                                                <a class="add" href="#"><img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/add.svg" alt="add"/></a>
                                            </div>

                                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link active" id="Open-tab" data-bs-toggle="tab" data-bs-target="#Open" type="button" role="tab" aria-controls="Open" aria-selected="true">Chat</button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="Closed-tab" data-bs-toggle="tab" data-bs-target="#Closed" type="button" role="tab" aria-controls="Closed" aria-selected="false">Follow</button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="modal-body">
                                        
                                            <div class="chat-lists">
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                    
                                                        <div class="chat-list">
                                                        {followuser.length !== 0 ? (
                                                            followuser.map((item, index) => (
                                                                item.id != null ?
                                                                (
                                                                    <>
                                                                        <a onClick={(e) => { e.preventDefault(); handleChatListClick(); setFollowingId(item.id); loadChat(item.id) }} key={item.id} className="d-flex align-items-center mt-4" data-bs-toggle="offcanvas" href="#offcanvasStart" role="button" aria-controls="offcanvasStart">
                                                                            <div className="flex-shrink-0 border border-1" style={{borderRadius:'50%' , height:'45px' , width:'45px'}}>
                                                                                <img className="img-fluid" style={{borderRadius:'50%'  ,height:'100%' , width:'100%'}}   src={item.pro_pic ? item.pro_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s" } alt="user img" />
                                                                                <span className="active"></span>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>{item.user_profile !=null ? item.user_profile  : item.mobail? item.mobail : item.name }</h3>
                                                                                <p>
                                                                                    {item.msg && item.msg.length !== 0 
                                                                                        ? item.msg.length > 14 
                                                                                        ? `${item.msg.substring(0, 14)}...` 
                                                                                        : item.msg 
                                                                                        : item.photo && item.photo.length !== 0 
                                                                                        ? <i className="fa-solid fa-image"></i> 
                                                                                        : <i className="fa-solid fa-video"></i>}
                                                                                </p>

                                                                            </div>
                                                                        </a>
                                                                    </>
                                                                ):
                                                                (<div></div>)
                                                            ))
                                                        ) : (
                                                            <div>No Message At</div>
                                                        )}

                                                            
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">
                                                        <div className='chat-list'>
                                                            {fetchUser.length !== 0 ? (
                                                                fetchUser.map((item, index) => (
                                                                    item.id != null ?
                                                                    (
                                                                        <>
                                                                            <a  key={item.id} className="d-flex align-items-center mt-4" >
                                                                                <div className="flex-shrink-0 border border-1" style={{borderRadius:'50%' , height:'45px' , width:'45px'}}>
                                                                                    <img className="img-fluid" style={{borderRadius:'50%'  ,height:'100%' , width:'100%'}}   src={item.pro_pic ? item.pro_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s" } alt="user img" />
                                                                                    <span className="active"></span>
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-3">
                                                                                    <h3>{item.user_profile !=null ? item.user_profile  : item.mobail? item.mobail : item.name }</h3>
                                                                                    <p>front end developer</p>
                                                                                </div>
                                                                                <div><FollowBtn/></div>
                                                                            </a>
                                                                        </>
                                                                    ):
                                                                    (<div></div>)
                                                                ))
                                                            ) : (
                                                                <div>No Message At</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`chatbox ${showBox ? 'showbox' : ''}`}>   <div class="modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="msg-head">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="d-flex align-items-center">
                                                        <span class="chat-icon" onClick={handleChatIconClick} ><img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="image title"/></span>
                                                    
                                                        {
                                                            userbyuseriddata.length!=0? 
                                                            ( <div className="flex-shrink-0 border border-1" style={{borderRadius:'50%' , height:'45px' , width:'45px'}}>
                                                                <img className="img-fluid" style={{borderRadius:'50%'  ,height:'100%' , width:'100%'}}   src={userbyuseriddata.pro_pic ? userbyuseriddata.pro_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s" } alt="user img" />
                                                            </div>
                                                            )
                                                            :
                                                            (
                                                                <div></div>
                                                            )
                                                        }
                                                            <span className="active"></span>
                                                    
                                                        <div class="flex-grow-1 ms-3">
                                                            <h3>{userbyuseriddata.user_profile !=null ? userbyuseriddata.user_profile  : userbyuseriddata.mobail? userbyuseriddata.mobail : userbyuseriddata.name }</h3>
                                                            <p>{userbyuseriddata.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div className='d-flex gap-2 mx-2 float-end collapse navbar-collapse'>
                                                        <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => { setMessagetheam('aliceblue');  setBodyBackgroundColor(); } } style={{height : '25px', width: '25px' , backgroundColor : 'aliceblue'}}></div>
                                                        <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => { setMessagetheam('#ffff');  setBodyBackgroundColor(); } } style={{height : '25px', width: '25px' , backgroundColor : '#ffff'}}></div>
                                                        <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => { setMessagetheam('antiquewhite');  setBodyBackgroundColor(); } } style={{height : '25px', width: '25px' , backgroundColor : 'antiquewhite'}}></div>
                                                        <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => { setMessagetheam('lavender');  setBodyBackgroundColor(); } } style={{height : '25px', width: '25px' , background : 'lavender'}}></div>
                                                        <div className='rounded-circle border border-1 border-dark-subtle text-center align-items-center justify-content-center' data-bs-toggle="collapse" data-bs-target="#toggleContent" aria-expanded="false" aria-controls="toggleContent"  style={{height : '25px', width: '25px' ,zIndex : '99', background : 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))'}}><i class="fa-solid fa-plus text-white fs-10"></i>
                                                        </div>
                                                        <div className='collapse' id="toggleContent" style={{ position :'absolute' , zIndex:'999'  ,left: '73vh' ,top :'51px'}}><TwitterPicker style={{ zIndex : '999' }} colors={lightColors} onChangeComplete={(color) => { setMessagetheam(color.hex);  setBodyBackgroundColor(); } }  /></div> 
                                                    </div>
                                                    {/* <ul class="moreoption">
                                                        <li class="navbar nav-item dropdown">
                                                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                                                            <ul class="dropdown-menu">
                                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                <li>
                                                                    <hr class="dropdown-divider"/>
                                                                </li>
                                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-body">
                                            <div class="msg-body px-3">
                                                {
                                                    userbyuseriddata.length==0?
                                                    (<>
                                                    <div className='row welcome-bg'>
                                                        <div className=''>
                                                            <div className=" align-items-center justify-content-center welcome-bg" style={{minHeight : '711px' }}>
                                                            <div className="profile-container  justify-content-center p-3">
                                                                <Fade cascade> <motion.div className="profile-top p-2 shadow-lg" style={{ borderRadius: '40px', marginTop : '50px', height :'560px', position: 'relative', overflow: 'hidden', width : '615px' }} >
                                                                    <div className="p-3" style={{ borderRadius: '30px', background: 'linear-gradient(135deg, rgb(211 193 188), rgb(199 123 254))', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)', marginTop :'100px', height :'441px' }} >
                                                                        <Zoom duration={500}>
                                                                        <img className="profile-banner-img" src={bippic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTu9pPTi6sJYwiM_MHafuDFQczkTQJABENfg&s"} alt="Profile Background" style={{ borderRadius: '30px', width: '100%', height: '150px', objectFit: 'cover', }} />
                                                                        </Zoom>
                                                                        <motion.div className="profile-avatar position-absolute translate-middle user-info  " initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }} style={{ top: "120px", left: "50%", transform: "translateX(-50%)", width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', }} >
                                                                        <img src={userPhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} alt="User" className="w-100 h-100 rounded-circle  shadow-sm user-photo animated-bounce" />
                                                                        </motion.div>
                                                                        <div className="text-center mt-2 text-white">
                                                                        <h2>welcome</h2>
                                                                        </div>
                                                                        <div className="text-center mt-1 text-white mb-2">
                                                                        <h4>{fullname}</h4>
                                                                        </div>
                                                                        {/* <div className='d-flex gap-3 mx-2 mt-5'>
                                                                            <img class="animate" height='100' width='100' style={{ borderRadius :'20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&amp;s" alt="dog1"/>
                                                                            <img class="animate" height='100' width='100' style={{ borderRadius :'20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&amp;s" alt="dog1"/>
                                                                            <img class="animate" height='100' width='100' style={{ borderRadius :'20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&amp;s" alt="dog1"/>
                                                                            <img class="animate" height='100' width='100' style={{ borderRadius :'20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&amp;s" alt="dog1"/>
                                                                            <img class="animate" height='100' width='100' style={{ borderRadius :'20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&amp;s" alt="dog1"/>
                                                                        </div> */}
                                                                    </div>
                                                                    </motion.div>
                                                                </Fade>
                                                                </div>````
                                                            
                                                            </div>
                                                        </div>
                                                        <div className=''>
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
                                                        </div>
                                                    </div>
                                                    </>)
                                                    :
                                                    (<div></div>)
                                                }
                                                <Fade cascade duration={100}>
                                            {userchat.length !== 0 ? (
                                                <ul>
                                                    {userchat.reduce((acc, item, index) => {
                                                        const messageDate = new Date(item.create_at);
                                                        const today = new Date();
                                                        const diffInTime = today.setHours(0, 0, 0, 0) - messageDate.setHours(0, 0, 0, 0);
                                                        const diffInDays = diffInTime / (1000 * 3600 * 24);
                                                        const formattedTime = messageDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                                                        // Determine the header for today, yesterday, or older
                                                        if (diffInDays === 0 && !acc.todayHeaderShown) {
                                                            acc.items.push(<div className="divider" key={`header-today-${index}`}><h6>Today</h6></div>);
                                                            acc.todayHeaderShown = true; // Set the flag to indicate that the header has been displayed
                                                        } else if (diffInDays === 1 && !acc.yesterdayHeaderShown) {
                                                            acc.items.push(<div className="divider" key={`header-yesterday-${index}`}><h6>Yesterday</h6></div>);
                                                            acc.yesterdayHeaderShown = true; // Set the flag for yesterday header
                                                        } else if (diffInDays > 1 && !acc.otherDatesHeaders.includes(messageDate.toLocaleDateString())) {
                                                            acc.items.push(<div className="divider" key={`header-${messageDate.toLocaleDateString()}`}><h6>{messageDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</h6></div>);
                                                            acc.otherDatesHeaders.push(messageDate.toLocaleDateString()); // Keep track of displayed headers for other dates
                                                        }

                                                        acc.items.push(
                                                            <li className={UserID === item.from_user_id ? "repaly rounded-4" : "sender rounded-4"} key={index}>
                                                            <div>
                                                                <p className={item.video && item.video !== '' ? 'p-0' : item.photo && item.photo !== '' ? 'p-0' :''}>
                                                                {
                                                                    item.msg && item.msg !== '' ? (
                                                                    item.msg
                                                                    ) : item.video && item.video !== '' ? (
                                                                    <VideoPlayer videoUrls={item.video} />
                                                                    ) : 
                                                                    (
                                                                        <ImageViewer imageUrls={item.photo}/>
                                                                    )
                                                                }
                                                                </p>
                                                                <span className="time">{formattedTime}</span>
                                                            </div>
                                                            </li>
                                                        );
                                                        
                                                        return acc;
                                                    }, { items: [], todayHeaderShown: false, yesterdayHeaderShown: false, otherDatesHeaders: [] }).items}
                                                </ul>
                                            ) : (
                                                <div></div>
                                            )}

                                            </Fade>
                                            </div>
                                        </div>
                                        <div class="send-box">
                                            <form action="">
                                            {userbyuseriddata.user_profile !=null ?
                                                ( <>
                                                            <input type="text" onChange={e=>setMessageText(e.target.value)} value={messageText} class="form-control" aria-label="message…" placeholder="Write message…"/>

                                                            <button onClick={()=>sendMessge(userbyuseriddata.id)} type="button"><i class="fa fa-paper-plane" aria-hidden="true"></i> Send</button>
                                                    </>)
                                                :
                                                (<div></div>)
                                            }
                                            </form>

                                            <div class="send-btns">
                                                <div class="attach">
                                                    <div class="button-wrapper">
                                                        <span class="label">
                                                            <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/upload.svg" alt="image title"/> attached file 
                                                        </span><input type="file" onChange={handleFileChange} name="upload" id="upload" class="upload-box" placeholder="Upload File" aria-label="Upload File"/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                             <div className='col-2' style={{backgroundColor : '#fff'}}>
                                <Rightsidebar chatMessageData={userbyuseriddata}/>
                            </div>
                
                   
                </div>
            </div>
        </section>
    </div>
    </>
   
 
  );
};

export default ChatApp;

import React, { useState ,useEffect } from 'react';
import './ChatApp.css'; 
import Header from '../Header/Header';
import axios from 'axios';
import { UserProvider ,useUser } from '../../UserContext';
import Chatcontainer from '../../components/Chatcontainer/Chatcontainer';
import { ToastContainer, toast } from 'react-toastify';


const ChatApp = () => {
    const [showBox, setShowBox] = useState(false);
    const { user } = useUser();
    const [followuser,setFollowuser] = useState([]);
    const [followingId,setFollowingId] = useState([]);
    const [userbyuseriddata,setUserbyuseriddata] = useState([]);
    const [messageText,setMessageText] = useState('');
    const handleChatListClick = () => {
      setShowBox(true);
    };
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
    }
  
    const handleChatIconClick = () => {
      setShowBox(false);
    };

  
    const loadChat = async (id) => {

        try {
            const response = await axios.get(`http://localhost:3000/api/userByuserid/${id}`);
            console.log(response);
            setUserbyuseriddata(response.data[0]);
        } catch (error) {
            console.error('Error fetching user chat status:', error);
        }

        try {
          const response = await axios.get(`http://localhost:3000/api/userchat/${UserID}/${id}`);
          console.log(response);
          setUserchat(response.data);
        } catch (error) {
          console.error('Error fetching user chat status:', error);
        }
    };
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
          else
          {
            toast.info('please enter message', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
    }
  return (
    <>
     <Header/>
    <div className='container'>
    <section class="message-area mt-2">
        <div class="container">
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
                                                <button class="nav-link active" id="Open-tab" data-bs-toggle="tab" data-bs-target="#Open" type="button" role="tab" aria-controls="Open" aria-selected="true">Open</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="Closed-tab" data-bs-toggle="tab" data-bs-target="#Closed" type="button" role="tab" aria-controls="Closed" aria-selected="false">Closed</button>
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
                                                                    <a onClick={(e) => { e.preventDefault(); handleChatListClick(); loadChat(item.id) }} key={item.id} href="#" className="d-flex align-items-center mt-2">
                                                                        <div className="flex-shrink-0 border border-1" style={{borderRadius:'50%' , height:'45px' , width:'45px'}}>
                                                                            <img className="img-fluid" style={{borderRadius:'50%'  ,height:'100%' , width:'100%'}}   src={item.pro_pic ? item.pro_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s" } alt="user img" />
                                                                            <span className="active"></span>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-3">
                                                                            <h3>{item.user_profile !=null ? item.user_profile  : item.mobail? item.mobail : item.name }</h3>
                                                                            <p>front end developer</p>
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
                                                    <div class="chat-list">
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                                <span class="active"></span>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Mehedi Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Ryhan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Malek Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Sadik Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Bulu </h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Maria SK</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Dipa Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Jhon Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Tumpa Moni</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Payel Akter</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Baby Akter</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Zuwel Rana</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Habib </h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Jalal Ahmed</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Hasan Ali</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="d-flex align-items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"/>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <h3>Mehedi Hasan</h3>
                                                                <p>front end developer</p>
                                                            </div>
                                                        </a>

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
                                                <ul class="moreoption">
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
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="msg-body mx-3">
                                            {
                                                userbyuseriddata.length==0?
                                                (<div>welcome</div>)
                                                :
                                                (<div></div>)
                                            }
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
                                                        <li className={UserID === item.from_user_id ? "repaly" : "sender"} key={index}>
                                                            <div>
                                                                <p>{item.msg}</p>
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
                                                    </span><input type="file" name="upload" id="upload" class="upload-box" placeholder="Upload File" aria-label="Upload File"/>
                                                </div>

                                                <select class="form-control" id="exampleFormControlSelect1">
                                                    <option>Select template</option>
                                                    <option>Template 1</option>
                                                    <option>Template 2</option>
                                                </select>

                                                <div class="add-apoint">
                                                    <a href="#" data-toggle="modal" data-target="#exampleModal4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none"><path d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z" fill="#7D7D7D"/><path d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z" fill="#7D7D7D"/><path d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z" fill="#7D7D7D"/></svg> Appoinment</a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    </>
   
 
  );
};

export default ChatApp;

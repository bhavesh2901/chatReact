import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserProvider , useUser} from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import liveChatImage from '../assets/livechat.png';
const Header = () => {
  const { user ,setUser } = useUser();
  const navigate = useNavigate();

  const setBodyBackgroundColor = async (color) => {
    document.body.style.background = color;
    
      try {
        await axios.post('http://localhost:3000/api/outModeTheame', {
          UserID : UserID,
          theme : color,
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
  };
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
    let biopic = '';
    let joining = '';
    let gender = '';
 
    if (user) {
        fullname =   user['user_profile']
        name =    user['name']
        UserID =   user['id']
        email =   user['email']
        userPhone =   user['mobail']
        userPhoto =   user['pro_pic']
        school =    user['school']
        collage =   user['collage']
        City =   user['city']
        maritalstatus =   user['marital_status']
        biopic =    user['bio_pic']
        joining =   user['createat']
        gender =   user['gender']==1 ? 'male' : 'female';
    }
    const [statusname , setStatusname] = useState(true);
    const handleLogout = () => {
      // Remove the token from localStorage
      localStorage.removeItem('chatToken');
      navigate('/');
      setUser('');
    };
  
   
  return (
    <>
<div class="offcanvas offcanvas-start mx-2 shadow" style={{backgroundColor : "#8a8888" , borderRadius :'40px' }} data-bs-backdrop="false" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="">
  <button type="button" class="btn position-absolute  fs-10 translate-middle rounded  fs-5" onClick={()=>setStatusname(true)} style={{ top: "30px" , left: "362px" , zIndex : '99'}}  data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa-solid fa-xmark text-white"></i></button>
    <div className='profile-top  p-2' style={{ borderRadius : '40px'}}>
      <div class="bg-dark p-2" style={{ borderRadius : '40px'}}  >
        <img className='rounded' src={biopic ? biopic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTu9pPTi6sJYwiM_MHafuDFQczkTQJABENfg&s"} style={{ borderRadius : '40px'}} height='150' class="card-img-top" alt="..."/>
          <div class="text-center position-absolute  fs-10 translate-middle rounded  fs-5" style={{ top: "146px" , left: "200px"}}>
            <img src={userPhoto ? userPhoto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} height="100" width="100" class="rounded-circle" alt="..."/>
          </div>
          <div className='text-center mt-5 text-white'> {fullname} </div>
          <div className='text-center mt-1 text-white mb-2'> {email}</div>
      </div>
    </div>
    <div className='profile=-middle p-2'>
      <div className='row'>
          <div className='col-lg-6'>
              <div className='p-2 bg-dark d-flex' style={{ borderRadius : '40px'}}>
                <div className='d-flex gap-2'>
                      <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => setBodyBackgroundColor('linear-gradient(135deg, rgb(110, 115, 183), rgb(49, 230, 202))')} style={{height : '35px', width: '35px' , background : 'linear-gradient(135deg, rgb(110 115 183), rgb(49 230 202))'}}></div>
                      <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => setBodyBackgroundColor('linear-gradient(135deg, rgb(109 35 151 / 79%), rgb(140 22 83 / 87%)')} style={{height : '35px', width: '35px' , background : 'linear-gradient(135deg, rgb(109 35 151 / 79%), rgb(140 22 83 / 87%)'}}></div>
                      <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => setBodyBackgroundColor('linear-gradient(135deg, rgb(17 17 18 / 79%), rgb(41 40 40))')} style={{height : '35px', width: '35px' , background : 'linear-gradient(135deg, rgb(17 17 18 / 79%), rgb(41 40 40))'}}></div>
                      <div className='rounded-circle border border-1 border-dark-subtle'  onClick={() => setBodyBackgroundColor('linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))')} style={{height : '35px', width: '35px' , background : 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))'}}></div>
                </div>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='p-2 bg-dark d-flex' style={{ borderRadius : '40px'}}>
                <button className=' py-2 btn btn-outline-danger rounded-pill mx-3 border border-danger text-white'><i class="fa-solid fa-pen-to-square mx-2"></i></button>
                <div className='text-white mt-2'>Edit</div>
              </div>
          </div>
      </div>
      <div className='row mt-2'>
          <div className='col-lg-12'>
              <div className='' style={{ borderRadius : '40px'}}>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>Phone    : {userPhone}</div>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>school   : {school}</div>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>collage  : {collage}</div>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>City     : {City}</div>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>joining  : {joining}</div>
                <div className='bg-dark text-white rounded-pill mt-1 p-3'>gender  : {gender}</div>
              </div>
          </div>
      </div>
    </div>
    <div className='profile-bottom mt-5'>
        <div className='d-flex' style={{ borderRadius : '40px'}}>
          <button   onClick={handleLogout}  className='w-100 py-2 btn btn-outline-danger bg-dark rounded-pill mx-3 border border-danger text-white'><i class="fa-solid fa-power-off mx-2"></i> Logout</button>
        </div>
    </div>
  </div>
</div>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <div className='d-flex border border-1 rounded-3 p-1 bg-white  align-items-center justify-content-center' style={{lineHeight :'0px' , rotate :'339deg' , lineHeight : '9px'}}>
        <a class="" href="#" ><img src='/assets/send.png' height='30' width='30'></img></a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="nav-overlay"></div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            {/* <Link class="nav-link active" aria-current="page" to="/">Home</Link> */}
          </li>
          <li class="nav-item">
          {/* <Link class="nav-link active" aria-current="page" to="/loginsignup">Login</Link> */}
          </li>
          <li class="nav-item dropdown">
            {/* <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a> */}
            {/* <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Service 1</a></li>
              <li><a class="dropdown-item" href="#">Service 2</a></li>
              <li>
                <a class="dropdown-item" href="#">Service 3</a>
              </li>
            </ul> */}
          </li>
          <li class="nav-item">
            {/* <a class="nav-link">Contact Us</a> */}
          </li>
        </ul>
      </div>
      <div className='float-end d-flex align-items-center justify-content-center text-white'>
            {/* <img src=''></img> */}
            <div className='rounded-pill d-flex bg-primary p-1 collapse navbar-collapse' onClick={()=>setStatusname(false)} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" style={{alignItems: 'center'}}>
              {
                userPhoto ?
                (<img src={userPhoto} height='40' style={{borderRadius: '50%'}} width='40'></img> )
                :
                (
                  <> 
                    <div className='rounded-circle bg-white' style={{ height: '30px' , width: '30px' , alignItems: 'center' , display: 'flex'}}>
                    <center><i class="fa-solid fa-user text-dark mx-2"></i></center> 
                    </div>
                  </>
                )
              }
             
              <div className={`mx-2 ${statusname ? 'show' : 'hide'}`}>{name ? name : fullname? fullname : ''}</div>
            </div>
            
      </div>
    </div>
  </nav>
</header>
    </>
  )
}

export default Header

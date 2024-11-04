import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserProvider , useUser} from '../../UserContext';

// import liveChatImage from '../assets/livechat.png';
const Header = () => {
  const { user } = useUser();
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
        school =    user['school']
        collage =   user['collage']
        City =   user['city']
        maritalstatus =   user['marital_status']
        bippic =    user['bio_pic']
        joining =   user['createat']
        gender =   user['gender']==1 ? 'male' : 'female';
    }
  return (
    <>
<div class="offcanvas offcanvas-start mx-2 rounded" style={{backgroundColor : "transparent"}} data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="">
  <button type="button" class="btn position-absolute  fs-10 translate-middle rounded  fs-5" style={{ top: "30px" , left: "362px" , zIndex : '99'}}  data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa-solid fa-xmark text-white"></i></button>
    <div className='profile-top  p-2' style={{ borderRadius : '40px'}}>
      <div class="bg-dark p-2" style={{ borderRadius : '40px'}}  >
        <img className='rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTwLB24lNu8iQBCTwWtEcZ5TtlEAJT6YR0Fg&s" style={{ borderRadius : '40px'}} height='150' class="card-img-top" alt="..."/>
          <div class="text-center position-absolute  fs-10 translate-middle rounded  fs-5" style={{ top: "146px" , left: "200px"}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9us0MxB35Wv3z03TJFrxhub-WyxqpBKAsjQ&s" height="100" width="100" class="rounded-circle" alt="..."/>
          </div>
          <div className='text-center mt-5 text-white'> bhavesh </div>
          <div className='text-center mt-1 text-white mb-2'> chavdabhavesh2901@gmail.com </div>
      </div>
    </div>
    <div className='profile=-middle p-2'>
      <div className='row'>
          <div className='col-lg-6'>
              <div className='p-2 bg-dark d-flex' style={{ borderRadius : '40px'}}>
                <div class="form-check form-switch mx-3 fs-3">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                </div>
                <label class="form-check-label text-white fs-10 mt-2" for="flexSwitchCheckDefault">Mode</label>
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
          <button className='w-100 py-2 btn btn-outline-danger rounded-pill mx-3 border border-danger text-white'><i class="fa-solid fa-power-off mx-2"></i> Logout</button>
        </div>
    </div>
  </div>
</div>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="" href="#" ><img src='/assets/Facebook_Messenger-512.webp' height='30' width='30'></img></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="nav-overlay"></div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/loginsignup">Login</Link>
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
      <div className='float-end text-white'>
            {/* <img src=''></img> */}
            <div className='rounded-pill d-flex bg-primary p-1 collapse navbar-collapse' data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" style={{alignItems: 'center'}}>
              <div className='rounded-circle bg-white' style={{ height: '30px' , width: '30px' , alignItems: 'center' , display: 'flex'}}>
                <center><i class="fa-solid fa-user text-dark mx-2"></i></center> 
              </div>
              <div className='mx-2'>{name}</div>
            </div>
            
      </div>
    </div>
  </nav>
</header>
    </>
  )
}

export default Header

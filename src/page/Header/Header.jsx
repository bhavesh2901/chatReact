import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
// import liveChatImage from '../assets/livechat.png';
const Header = () => {

  return (
    <>
<div class="offcanvas offcanvas-start mx-2 rounded" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      I will not close if you click outside of me.
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
              <div className='mx-2'>bhavesh</div>
            </div>
            
      </div>
    </div>
  </nav>
</header>
    </>
  )
}

export default Header

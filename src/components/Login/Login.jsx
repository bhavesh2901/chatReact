import React, { useState } from 'react'
import './Login.css';
// import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
const LoginSignup = () => {
    
    const [activeClass, setActiveClass] = useState();
    let signupEvent=()=>{
        setActiveClass('right-panel-active');
    }
    let signinEvent=()=>{
        setActiveClass('');
    }

    // const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [signupemail , setSignupemail] = useState('');
    const [signuppassword , setSignuppassword] = useState('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');
    let HandleSubmitActionSignUp = async (event)=>
    {
        // event.preventDefault();
        // try {
        //     let response;

        //         response = await axios.post('http://localhost:3000/api/signup/add', {
        //             Role_id: 1,
        //             phone,
        //             name,
        //             signupemail,
        //             signuppassword,
        //             Status: 'active'
        //         });
        
        //         // Reset the form fields
        //         setSignupemail('');
        //         setSignuppassword('');
        //         setName('');
        //         setPhone('');
        
        //         // Show the appropriate toast message based on the server response
        //         toast(`${response.data.message === "Signup successful" ? '✔️' : '😬'} ${response.data.message}`, {
        //             position: "top-right",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        // } catch (error) {
        //     // Show an error toast in case of failure (like user already exists or server error)
        //     toast('😬 ' + error.response?.data?.message || 'Error during signup', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        //     console.error('Error during signup:', error);
        // }
        
    }
    let HandleSubmitAction =async (event)=>
    {
        // event.preventDefault();
        // try 
        // {
        //     const response = await axios.post('http://localhost:3000/api/login', {
        //       email,
        //       password
        //     });
        //     // const userData = response.data.user;  // Log the response data
        //     if(response.data.message=="Login successful")
        //     {
        //         const { user, token } = response.data; // Get user and token from response

        //         // Save the token in localStorage
        //         localStorage.setItem('authToken', token);
        //         // Store the user info in the state
        //         setUser(user );
    
        //          navigate('/', { state: { user: user } });
        //          toast.success(`${response.data.message}`, {
        //             position: "top-right",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //     }
        // } 
        // catch (error) 
        // {
        //     console.error('Error during login:', error);
        //     // Handle login error
        // }
    }
  return (
    <>
        <div className={"container2 "+activeClass} id="container2" style={{margin: '201px auto auto'}}>
            <div className="form-container2 sign-up-container">
                <form  onSubmit={HandleSubmitActionSignUp} >
                    <h2>Create Account</h2>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <input onChange={e=>setName(e.target.value)} type="text" placeholder="*Name" value={name} required/>
                    <input onChange={e=>setPhone(e.target.value)} type="text" placeholder="*Phone" value={phone} required />
                    <input onChange={e=>setSignupemail(e.target.value)} type="email" placeholder="*Email" value={signupemail}  required/>
                    <input onChange={e=>setSignuppassword(e.target.value)} type="password" placeholder="*Password" value={signuppassword} required />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="container2 sign-in-container">
                <form onSubmit={HandleSubmitAction}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input onChange={e=>setEmail(e.target.value)} type="LoginEmail" placeholder="*Email" required />
                    <input onChange={e=>setPassword(e.target.value)} type="LoginPassword" placeholder="*Password" required />
                    <a href="#">Forgot your password?</a> 
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" onClick={() => signinEvent()} id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={() => signupEvent()} id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginSignup

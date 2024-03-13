/**
 * Login.jsx: General Login Page
 */

import React, { useState } from 'react';
import bgSignIn from "../images/Login.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const bodyStyle = {
    background: 'linear-gradient(to right, #301847, #C10214)', // Set your desired background color here
    minHeight: '100vh', // Ensure the gradient covers the entire viewport height
    display: 'flex',
    color: '#fff', // Set text color to contrast with the gradient
    fontSize: '24px',
  };
  
  const navigate = useNavigate();

  const Back=()=>{
      navigate("/");
  }

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div style = {bodyStyle} className ="grid grid-cols-2 px-4 items-center">
      
      {/** Back button */}
      <div style={{ 
          width: '50%',
          height: '100vh', // Adjust as needed
          backgroundImage: `url(${bgSignIn})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
      }} className = "grid grid-cols-2 px-3 " >
      
        <div className="text-white hover:text-orange-500 duration-300">
          <button
            onClick={() => Back()}
            className="flex items-center justify-center gap-2 w-10 h-10 rounded-full focus:outline-none "
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            <span className="font-semibold" style = {{fontFamily: 'Poppins', fontSize: '4vh'}}>Back</span>
          </button>
        </div>

      </div>

      <div style = {{fontFamily: 'Poppins'}} className = "px-8">
        <h1 className="text-4xl"><strong>Login</strong></h1>

        <div style = {{marginTop: '3vh'}}></div>

        <p>Welcome back! Enter your email and password to sign in.</p>

        {/** The login form */}
        <div style={{ marginTop: '10vh', color: 'black' }} className = "bg-white px-2 py-2 rounded-md">
          
          <div>
            <p className="text-xl">User Email</p>
            <input type = "text" placeholder = "Email"></input>
          </div>

          <div style = {{marginTop: '5vh'}}></div>

          <div>
            <p>User Password</p>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder = "Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>

          <div style = {{marginTop: '5vh'}}></div>

          <div>
            <button className = "bg-gradient-to-r from-purple-dark to-red-deep text-white px-3 py-2 rounded-md focus:outline-none">Sign In</button>
          </div>

        </div>
        {/** The login form ends*/}

        
      </div>
      
      
    </div>
  )
}

export default Login;
import React from 'react';
import bgSignIn from "../images/Login.png";

const Login = () => {
  const bodyStyle = {
    background: 'linear-gradient(to right, #301847, #C10214)', // Set your desired background color here
    minHeight: '100vh', // Ensure the gradient covers the entire viewport height
    display: 'flex',
    color: '#fff', // Set text color to contrast with the gradient
    fontSize: '24px',
  };

  
  return (
    <div style = {bodyStyle}>
      <div className ="grid grid-cols-2">
          <img src = {bgSignIn} className='w'></img>
      </div>
    </div>
  )
}

export default Login;
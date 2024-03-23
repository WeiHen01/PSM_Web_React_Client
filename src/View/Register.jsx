import React, { useState } from 'react'
import bgRegister from '../images/Register.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserCog, faStethoscope, faEnvelope, faLock, faEye, faEyeSlash  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Tab = styled.button`
  width: 50%;
  padding: 10px 20px;
  cursor: pointer;
  border: 0;
  background: ${({ active }) => (active ? 'linear-gradient(#301847, #C10214)' : 'white')}; /* Set background color based on active prop */
  color: ${({ active }) => (active ? 'white' : 'black')}; /* Set text color based on active prop */
  outline: 0;
  transition: all 0.3s ease; /* Smooth transition for all properties */
  font-size: 20px;

  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }

  ${({ active }) =>
    active &&
    `
    opacity: 1;
    transform: translateX(-3px); /* Slide up slightly when active */
    `
  }
`;

function TabGroup({ setActiveRole }) {
  const [active, setActive] = useState(types[0]);

  const handleTabClick = (type) => {
    setActive(type);
    setActiveRole(type); // Update active role in parent component
  };

  return (
    <>
      <div>
        {types.map((type, index) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => handleTabClick(type)}
          >
            {icons[index]} {/* Icon before text */}
            {type}
          </Tab>
        ))}
      </div>
      
    </>
  );
}

const types = ["Doctor", "Admin"];
// Define your corresponding icons array
const icons = [<FontAwesomeIcon icon={faStethoscope} style={{ marginRight: '5px' }}  />, <FontAwesomeIcon icon={faUserCog} style={{ marginRight: '5px' }} />];



const Register = () => {

  /** Navigation */
  const navigate = useNavigate();

  const bodyStyle = {
    background: 'linear-gradient(to right, #301847, #C10214)', // Set your desired background color here
    minHeight: '100vh', // Ensure the gradient covers the entire viewport height
    display: 'flex',
    color: '#fff', // Set text color to contrast with the gradient
    fontSize: '24px',
  };

  const shadowStyle = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Horizontal offset, Vertical offset, Blur radius, Color
  };

  const [activeRole, setActiveRole] = useState(types[0]); 
  
  /** For toggle to show password */
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };// State to track active role


  return (
    <div style = {bodyStyle} className ="grid grid-cols-2 px-4 items-center">
      <title>BITU3973 | Register</title>
      
      <div style={{ 
          width: '50%',
          height: '100vh', // Adjust as needed
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'Poppins'
        }} className = "px-3 " >
        <div className="text-white hover:text-orange-500 duration-300">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-10 h-10 rounded-full focus:outline-none "
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            <span className="font-semibold" style = {{fontFamily: 'Poppins', fontSize: '4vh'}}>Back</span>
          </button>
        </div>

        <h1 className="text-6xl"><strong style={shadowStyle}>Register</strong></h1>

        <div style = {{marginTop: '3vh'}}></div>

        <p className="text-sm">Welcome! Please register a new account to sign in.</p>

        {/** Role Selection for Login */}
        <p className="text-md font-semibold mt-2">Role</p>
        <div className="p-1 bg-white mt-2 border-2 border-orange rounded-sm">
          <TabGroup setActiveRole={setActiveRole} />
        </div>

        {/** Display active at here */}
        <p className='text-white text-sm'>You choose to sign up as: <strong>{activeRole}</strong></p>

        
        {/** The login form */}
        <div style={{ marginTop: '3vh', color: 'black' }} className = "bg-white px-2 py-2 rounded-md text-base">
          
          <p className='font-semibold'>User Email</p>
          
          <div style={{ position: 'relative' }}>
            
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
            />

            <input placeholder="Email" className="w-full pl-12 pr-2 py-2 bg-gray-100" style={{ paddingLeft: '35px' }} />
          </div>

          <p className='mt-3 font-semibold'>Password</p>
          
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon
              icon={faLock}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
            /> 
            
            <input 
              placeholder="Password" 
              className="w-full pl-12 py-2 bg-gray-100" 
              value={password}
              type={showPassword ? 'text' : 'password'} // Toggle between text and password type
              style={{ paddingLeft: '35px', paddingRight: '40px'}}
              onChange={(e) => setPassword(e.target.value)}   
            />

            {/* Toggle button for password visibility */}
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
              onClick={togglePasswordVisibility}
            />

          </div>
         
          <div className = "mt-2">
            <button 
              className = "font-bold w-full border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-md focus:outline-none hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300"
              onClick={()=>navigate("/Doctor/DoctorHome")}
            >
              Register
            </button>
          </div>

          <div className="flex justify-center mt-2 items-center gap-1"> {/* Flex container with end alignment */}
            <p className='text-sm'>Already have an account? </p>
            <a href="/Login" className='text-sm'><b>Login now!</b></a> {/* Removed unnecessary styles */}
          </div>

        </div>
        {/** The login form ends*/}
      </div>

      <div style={{ 
          width: '50%',
          height: '100vh', // Adjust as needed
          backgroundImage: `url(${bgRegister})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
      }} >
      </div>

      

      

        
    </div>
  )
}

export default Register
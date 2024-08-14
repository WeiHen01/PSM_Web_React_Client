import React, { useState, useEffect } from 'react'
import bgRegister from '../images/Register.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserCog, faStethoscope, faEnvelope, faLock, faEye, faEyeSlash, faPhone, faUserAlt  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';

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
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

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
    background: 'linear-gradient(to right, #301847, #C10214)', // Set your desired background color here // Ensure the gradient covers the entire viewport height
    display: 'flex',
    color: '#fff', // Set text color to contrast with the gradient
    fontSize: '24px',
    minHeight: '100vh', // Ensure the div covers the full viewport height
    overflowY: 'auto', // Add vertical scrollbar if content overflows
  };

  const shadowStyle = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Horizontal offset, Vertical offset, Blur radius, Color
  };

  const [activeRole, setActiveRole] = useState(types[0]); 
  
  /** For toggle to show password */
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);
    const endsWithCom = email.endsWith('.com');
    
    if (!isValidEmail || !endsWithCom) {
        setEmailMsg('Email must be in the format example@domain.com.');
    } else {
        setEmailMsg('');
    }
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

    let message = '';
    if (!minLength) message += 'Password must be at least 8 characters long. ';
    if (!hasNumber) message += 'Password must contain at least 1 number. ';
    if (!hasSpecialChar) message += 'Password must contain at least 1 special character. ';

    setPasswordMsg(message);
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };// State to track active role

  const toggleConfirmPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };// State to track active role
  
  const handleDoctorSignUp = async () => {

    const response = await fetch(`http://${window.location.hostname}:8000/api/doctor/findDoctorByEmail/${email}`);
        
    if (response.ok) {
      window.alert("Sorry! This email has been registered!");
    }
    else {
      if(password === conPassword && passwordMsg === '' && emailMsg === ''){
        try {
          const response = await axios.post(`http://${window.location.hostname}:8000/api/doctor/register`, {
            DoctorName: name,
            DoctorUsername: username,
            DoctorContact: contact,
            DoctorEmail: email,
            DoctorPassword: password,
          });
          console.log(response.data);
          
          // Handle success as needed (e.g., show success message, redirect, etc.)
          if(response.status === 200){
            window.alert("Successfully registered as doctor!");
    
            // Redirect to another route upon successful login
            navigate('/Login'); // Change '/dashboard' to your desired route
          }
        } catch (error) {
          console.error(error);
          setErrorMsg('Error registering as a doctor. Please try again.');
        }
      }
      else {
        setErrorMsg('Different password between original and confirmation password');
      }
    }
  };

  const handleAdminSignUp = async () => {
    const response = await fetch(`http://${window.location.hostname}:8000/api/admin/findAdminByEmail/${email}`);
        
    if (response.ok) {
      window.alert("Sorry! This email has been registered!");
    }
    else {
      if(password === conPassword && passwordMsg === '' && emailMsg === ''){
        try {
          const response = await axios.post(`http://${window.location.hostname}:8000/api/admin/register`, {
            AdminName: name,
            AdminUsername: username,
            AdminContact: contact,
            AdminEmail: email,
            AdminPassword: password,
          });
          console.log(response.data);
          
          // Handle success as needed (e.g., show success message, redirect, etc.)
          if(response.status === 200){
            window.alert("Successfully registered as admin!");
    
            // Redirect to another route upon successful login
            navigate('/Login'); // Change '/dashboard' to your desired route
          }
    
        } catch (error) {
          console.error(error);
          setErrorMsg('Error registering as an admin. Please try again.');
        }
      }
      else { 
        setErrorMsg('Different password between original and confirmation password');
      }
    }
    
  };

  /**
   * Google Authentication
   */
  const [userInfo, setUserInfo] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);

  /**
   * 
   * @param {*} e 
   */
  const GoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setUserInfo(response);
      console.log(`Log in successfully`);
    },
    onError: (error) => console.log(`Login Failed: ${error}`, )
  });
  
  useEffect (() => {
    if (userInfo) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((response) => {
            console.log(response);
            setProfileInfo(response.data);
            console.log(profileInfo);
            setEmail(response.data["email"]);
        })
        .catch((error) => console.log(error));
        
    }
    
  }, [userInfo, activeRole, profileInfo])

  return (
    <div style = {bodyStyle} className ="grid grid-cols-2 px-4 items-center h-screen">
      <title>BITU3973 | Register</title>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"></link>
      
      <div style={{ 
          width: '50%',
          height: '100vh', // Adjust as needed
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'Poppins'
        }} className = "px-3" >
        
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
        <div style={{ marginTop: '3vh', color: 'black', marginBottom: '5px', paddingBottom: '10px'}} className = "bg-white px-2 py-2 rounded-md text-base">
              
              <p className='font-semibold'>User Email</p>
              
              <div style={{ position: 'relative' }}>
                
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                />
    
                <input 
                  placeholder="Email" 
                  className="w-full pl-12 pr-2 py-2 bg-gray-100" 
                  style={{ paddingLeft: '35px' }}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} required
                    
                />
              </div>
              
              <p style={{ color: emailMsg ? 'red' : 'transparent', fontSize: '14px', marginTop: '5px' }}>
                {emailMsg}
              </p>

              <p className='font-semibold'>Name</p>
              
              <div style={{ position: 'relative' }}>
                
                <FontAwesomeIcon
                  icon={faUserAlt}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                />
    
                <input 
                  placeholder="Name" 
                  className="w-full pl-12 pr-2 py-2 bg-gray-100" 
                  style={{ paddingLeft: '35px' }}
                  value={name} 
                  onChange={(e) => setName(e.target.value)} required
                    
                />
              </div>
    

              <p className='font-semibold'>Username</p>
              
              <div style={{ position: 'relative' }}>
                
                <FontAwesomeIcon
                  icon={faUserAlt}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                />
    
                <input 
                  placeholder="Contact" 
                  className="w-full pl-12 pr-2 py-2 bg-gray-100" 
                  style={{ paddingLeft: '35px' }}
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} required
                    
                />
              </div>
    

              <p className='font-semibold'>Contact</p>
              
              <div style={{ position: 'relative' }}>
                
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                />
    
                <input 
                  placeholder="Contact" 
                  className="w-full pl-12 pr-2 py-2 bg-gray-100" 
                  style={{ paddingLeft: '35px' }}
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)} required
                    
                />
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
                  required  
                />
    
                {/* Toggle button for password visibility */}
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                  onClick={togglePasswordVisibility}
                />

              </div>
              <p style={{ color: passwordMsg ? 'red' : 'green', fontSize: '14px', marginTop: '5px' }}>
                {passwordMsg || 'Password is strong!'}
              </p>
    
              <p className='mt-3 font-semibold'>Confirm Password</p>
              
              <div style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faLock}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                /> 
                
                <input 
                  placeholder="Confirm Password" 
                  className="w-full pl-12 py-2 bg-gray-100" 
                  value={conPassword}
                  type={showConPassword ? 'text' : 'password'} // Toggle between text and password type
                  style={{ paddingLeft: '35px', paddingRight: '40px'}}
                  onChange={(e) => setConPassword(e.target.value)}  
                  required 
                />
                
                {/* Toggle button for password visibility */}
                <FontAwesomeIcon
                  icon={showConPassword ? faEyeSlash : faEye}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                  onClick={toggleConfirmPasswordVisibility}
                />
    
              </div>
            
              <div className = "mt-2">
                <button 
                  className = "font-bold w-full border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-md focus:outline-none hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300"
                  onClick= {activeRole === 'Doctor' ? handleDoctorSignUp : handleAdminSignUp}
                >
                  Register
                </button>
              </div>
    
              {/* Error message */}
              {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
    
              <div className="flex justify-center mt-2 items-center gap-1"> {/* Flex container with end alignment */}
                <p className='text-sm'>Already have an account? </p>
                <a href="/Login" className='text-sm hover:text-orange-600 duration-300'><b>Login now!</b></a> {/* Removed unnecessary styles */}
              </div>

              {/** Google Login Button */}
              <div className="flex justify-evenly mt-2 items-center gap-1"> {/* Flex container with end alignment */}
                
                <button type="button" onClick={GoogleLogin} className="flex items-center border-rose-400 border-2 p-3 rounded-md font-medium hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300">
                  <FaGoogle size={30}  className='pr-2' />
                  <p className=' font-semibold'>Login with Google</p>
                </button>
                
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
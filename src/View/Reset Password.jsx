import React, {useState} from 'react'
import bgForgetPassword from "../images/Reset_password.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const ResetPassword = () => {

   // Use useParams to access URL parameters
   const { state } = useLocation();
   const { id, activeRole, username } = state;
   console.log(id);
   console.log(activeRole);

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

  /** Navigation */
  const navigate = useNavigate();

  /** For toggle to show password */
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };// State to track active role

  const toggleConfirmPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };// State to track active role

  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Update Password
   * @param {*} e 
   */
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if(password !== conPassword){
      setErrorMsg("Different password input");
    }
    else {
      if(activeRole === "Doctor"){
        try {
          const response = await axios.put(`http://${window.location.hostname}:8000/api/doctor/update/id/${id}`, {
              DoctorPassword: password
          });
          console.log(response.data); // Assuming the response returns a success message
          window.alert("Update password successful!");
          navigate("/Login");
        } catch (error) {
          console.error('Error updating profile:', error);
          // Handle error state or display error message to the user
        }
      }
      else {
        try {
          const response = await axios.put(`http://${window.location.hostname}:8000/api/admin/update/id/${id}`, {
              AdminPassword: password
          });
          console.log(response.data); // Assuming the response returns a success message
          window.alert("Update password successful!");
          navigate("/Login");
        } catch (error) {
          console.error('Error updating profile:', error);
          // Handle error state or display error message to the user
        }
      }
    }
  };

  return (
    <div style = {bodyStyle} className ="grid grid-cols-2 px-4 items-center h-screen">
      <title>BITU3973 | Forget Password</title>
      {/** Back button */}
      <div style={{ 
          width: '50%',
          height: '100vh', // Adjust as needed
          backgroundImage: `url(${bgForgetPassword})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
      }} className = "px-3 " >

        {/** Back button */}
        <div className="text-white hover:text-orange-500 duration-300">
          <button
            onClick={() => navigate("/Login")}
            className="flex items-center justify-center gap-2 w-10 h-10 rounded-full focus:outline-none "
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
            <span className="font-semibold" style = {{fontFamily: 'Poppins', fontSize: '4vh'}}>Back</span>
          </button>
        </div>

      </div>

      <div style = {{fontFamily: 'Poppins', width: '50%',}} className = "px-8">
        <h1 className="text-6xl"><strong style={shadowStyle}>Reset Password</strong></h1>

        <br></br>

        <p className="text-sm">{activeRole === 'Doctor'? `Welcome Back, Dr. ${username}!` : `Welcome Back, Admin ${username}!`} Please enter new password for updating your <strong>{activeRole}</strong> profile.</p>

        <br></br>

        <form onSubmit={handleUpdate}>
          
          <p className='mt-3 text-base font-semibold'>Password</p>    
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
              style={{ paddingLeft: '40px', paddingRight: '40px', color: 'black', fontSize: '15px'}}
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

          <p className='mt-3 text-base font-semibold'>Confirm Password</p>
              
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
              style={{ paddingLeft: '40px', paddingRight: '40px', color: 'black', fontSize: '15px'}}
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

          <br />

          <div className = "mt-2">
            <button 
              className = "font-bold w-full border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-md focus:outline-none hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300"
              onClick= {handleUpdate}
            >
              Update Password
            </button>
          </div>

          {/* Error message */}
          {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
        </form>
      
      </div>

      

    </div>
      
  )
}

export default ResetPassword;

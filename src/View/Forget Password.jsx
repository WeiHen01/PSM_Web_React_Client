import React from 'react'
import bgForgetPassword from "../images/Reset_password.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEnvelope, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

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
        <h1 className="text-6xl"><strong style={shadowStyle}>Forget Password</strong></h1>

        <br></br>

        <p className="text-sm">Enter email address and we will help you to reset the password</p>

        <br></br>

        <div style={{ position: 'relative' }} className = "flex py-2 rounded-md text-base">
          
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
          />

          <input 
            placeholder="Email" 
            className="w-full pl-15 pr-2 py-2 bg-gray-100 text-black rounded-md" 
            style={{ paddingLeft: '35px' }} 
          />

          {/* Button beside the input */}
          <button
            className="ml-2 px-4 py-2 bg-orange-400 text-white rounded-md"
            onClick={() => {
              // Handle button click
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
          {/* End of button */}

        </div>
      
      </div>

    </div>
      
  )
}

export default ForgetPassword;

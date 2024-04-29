import React, {useState} from 'react'
import bgForgetPassword from "../images/Reset_password.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEnvelope, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";

const ForgetPassword = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { activeRole } = state;

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
  const [email, setEmail] = useState('');

  const findDoctorAccount = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log(email);

    try {
      // Add your login logic here based on activeRole (Doctor or Admin)
      const response = await fetch(`http://${window.location.hostname}:8000/api/doctor/findDoctorByEmail/${email}`);
     
      if (response.ok) {
        window.alert("Account found!");
        const data = await response.json();
        const doctorID = data["DoctorID"]; // Extract AdminID from the doctor object
        const username = data["DoctorName"]
        const id = doctorID;
        // Redirect to another route upon successful login
        navigate('/ResetPassword', { state: { id, activeRole, username } }); // Change '/dashboard' to your desired route
  
      }
      else {
        window.alert("Account not found!");
      }

    } catch (error) {
      console.error('Error fetching doctor info:', error);
      // Handle error state or display error message to the user
    }
  };

  const findAdminAccount = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Add your login logic here based on activeRole (Doctor or Admin)
    const response = await fetch(`http://${window.location.hostname}:8000/api/admin/findAdminByEmail/${email}`);
        
    if (response.ok) {
      window.alert("Account admin found!");
      const data = await response.json();
      const adminID = data["AdminID"]; // Extract AdminID from the doctor object
      const username = data["AdminName"];
      const id = adminID;

      // Redirect to another route upon successful login
      navigate('/ResetPassword', { state: { id, activeRole, username } }); // Change '/dashboard' to your desired route

    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Add your login logic here based on activeRole (Doctor or Admin)
    if (activeRole === 'Doctor') {
      findDoctorAccount(e);
    } else {
      findAdminAccount(e);
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

        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }} className = "flex py-2 rounded-md text-base">
            
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
            />

            <input 
              placeholder="Email" 
              className="w-full pl-15 pr-2 py-2 bg-gray-100 text-black rounded-md" 
              style={{ paddingLeft: '35px' }} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Button beside the input */}
            <button
              className="ml-2 px-4 py-2 bg-orange-400 text-white rounded-md"
              type = "submit"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            {/* End of button */}

          </div>
        </form>
      
      </div>

      

    </div>
      
  )
}

export default ForgetPassword;

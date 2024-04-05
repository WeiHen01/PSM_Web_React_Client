import React, {useState, useEffect} from 'react'
import DoctorLayout from '../../Components/DoctorLayout'
import '../../Doctor Style.css';
import Logo from '../../../../images/Logo.png'
import {Edit} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash  } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  const [doctorInfo, setDoctorInfo] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [updateProfileModalOpen, setUpdateModalOpen] = useState(false);

  const toggleUpdateModal = () => {
    setUpdateModalOpen(!updateProfileModalOpen);
  };

  /** For toggle to show password */
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };// State to track active role

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };// State to track active role

  const toggleConfirmPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };// State to track active role

  

  useEffect(() => {
    
    const getDoctorInfo = async () => {
      
      try {
        const response = await fetch(`http://localhost:8000/api/doctor/findDoctor/${doctorID}`);
        
        if (!response.ok) {
          throw new Error('Error retrieving doctor information');
        }
        const data = await response.json();
        setDoctorInfo(data);

      } catch (error) {
        console.error('Error fetching doctor info:', error);
        // Handle error state or display error message to the user
      }
    };

    getDoctorInfo(); // Call the function when component mounts
    
  }, [doctorID]);
  
  return (
    <div className = "overflow-y-auto" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName} active={"Profile"}>
      
        <div class="w-full px-5 pt-3 h-fit overflow-hidden text-center">
          <h1 class="text-xl py-1"><b>Profile</b></h1>
        </div>
      
        {isModalOpen && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update password
                  </h3>
                  <button
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4">
                  {/* Modal content (form) */}
                  <form className="space-y-4" action="#">
                    {/* Form inputs */}
                    {/* Your email input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Old password
                      </label>
                      <input
                        type={showOldPassword ? 'text' : 'password'}
                        name="Old password"
                        id="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Old password"
                        required
                      />

                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showOldPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleOldPasswordVisibility}
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        New password
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="New password"
                        id="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="New password"
                        required
                      />
                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showNewPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleNewPasswordVisibility}
                      />
                    </div>


                    {/* Your password input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Confirm new password
                      </label>
                      <input
                        type={showConPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={conPassword}
                        placeholder="Confirm new password"
                        onChange={(e) => setConPassword(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showConPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    </div>
                    {/* Remember me checkbox and Lost Password link */}
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-orange-600 hover:underline">
                        Lost Password?
                      </a>
                    </div>
                    {/* Login button */}
                    <button
                      type="submit"
                      className="w-full text-white hover:bg-gradient-to-r from-purple-dark to-red-deep bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Update Password
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}


        {updateProfileModalOpen && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update Profile
                  </h3>
                  <button
                    onClick={toggleUpdateModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4">
                  {/* Modal content (form) */}
                  <form className="space-y-4" action="#">
                    {/* Form inputs */}
                    {/* Your email input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Old password
                      </label>
                      <input
                        type='text'
                        name="Email"
                        id="Email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Email"
                        required
                      />

                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showOldPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleOldPasswordVisibility}
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        New password
                      </label>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="New password"
                        id="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="New password"
                        required
                      />
                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showNewPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleNewPasswordVisibility}
                      />
                    </div>


                    {/* Your password input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Confirm new password
                      </label>
                      <input
                        type={showConPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={conPassword}
                        placeholder="Confirm new password"
                        onChange={(e) => setConPassword(e.target.value)}  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                      {/* Toggle button for password visibility */}
                      <FontAwesomeIcon
                        icon={showConPassword ? faEyeSlash : faEye}
                        style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    </div>
                    {/* Remember me checkbox and Lost Password link */}
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-orange-600 hover:underline">
                        Lost Password?
                      </a>
                    </div>
                    {/* Login button */}
                    <button
                      type="submit"
                      className="w-full text-white hover:bg-gradient-to-r from-purple-dark to-red-deep bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Login to your account
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* <!-- cards --> */}
        <div class="w-full px-5 py-2 mx-auto h-fit overflow-hidden ">
          
          {/* <!-- row 1 --> */}
          <div class="flex flex-wrap px-3 -mx-2 gap-3 justify-center">
            
            <div className = "claymorphism-card-03 w-full items-center gap-3 h-full">
              
              <div className = "flex justify-center w-full">
                <img src={Logo} alt="Profile" className="p-2 w-28 h-28 rounded-full  bg-white cursor-pointer" />
              </div>

              <p className = "text-center text-2xl"><strong>{doctorName}</strong></p>
              <p className = "text-center text-md">Doctor</p>

              {doctorInfo && (<p className = "text-center font-semibold">{doctorInfo.DoctorEmail}</p>)}

              <p className = "text-center text-sm mt-6">This is my introduction</p>
            
            </div>

            <div className="gap-2">
              
              {/** Card 1 */}
              <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
                <div className ="flex justify-between text-black items-center">
                  <b><h1 className = "text-black text-2xl">Personal Info</h1></b>
                  <button onClick={toggleModal} className="hover:bg-gray-400">
                    <Edit />
                  </button>
                </div>

              
                

                <hr className="border-1 border-black my-2"></hr>

                <div className ="flex justify-between mr-10 text-black">
                  
                  <div>
                    <h1 className = "text-l">Username</h1>
                    {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorUsername}</p>)}
                  </div>

                  <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                  <div>
                    <h1 className = "text-l">Email</h1>
                    {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorEmail}</p>)}
                  </div>

                  <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                  <div>
                    <h1 className = "text-l">Contact</h1>
                    {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorContact}</p>)}
                  </div>

                </div>


              </div>


              {/** Card 2 */}
              <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
                
                <div className =" flex justify-between text-black items-center">
                  <b><h1 className = "text-black text-2xl">Bio</h1></b>
                  <button onClick={toggleUpdateModal}>
                    <Edit />
                  </button>
                </div>

                <hr className="border-1 border-black my-2"></hr>

              </div>

            </div>

            

          </div>


          {/** <!-- row 2 --> */}
          <div class= "flex flex-wrap -mx-3 group justify-between">
            
            

          </div>


        </div>
        
      </DoctorLayout>
    </div>
  )
}

export default DoctorProfile

import React, {useState, useEffect} from 'react'
import DoctorLayout from '../../Components/DoctorLayout'
import '../../Doctor Style.css';
import Logo from '../../../../images/Logo.png'
import { Edit, Lock} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash  } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DoctorProfile = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID } = state;

  const [doctorInfo, setDoctorInfo] = useState(null);

  /**
   * Toggle Update Modal
   */
  const [updateProfileModal, setProfileModalOpen] = useState(false);
  const updateProfile = () => {
    setProfileModalOpen(!updateProfileModal);
  };

  const [updatePasswordModal, setUpdatePasswordModalOpen] = useState(false);
  const updatePassword = () => {
    setUpdatePasswordModalOpen(!updatePasswordModal);
  };

  const [updateSpecialtyModal, setUpdateSpecialtyModalOpen] = useState(false);
  const updateSpecialty = () => {
    setUpdateSpecialtyModalOpen(!updateSpecialtyModal);
  };

  /**
   * Input field handler
   */
  // 1. Update Profile
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  /**
   * 2. Update Password
   */
  /** For toggle to show password */
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  /** Input for password */
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



  /**
   * 3. Update Specialty
   */
  // State to manage the value of the textarea
  const [specialty, setSpecialty] = useState('');
  // Handler function to update the textarea value
  const handleSpecialty = (event) => {
    setSpecialty(event.target.value);
  };



  const updateProfileInfo = async (e) => {
    e.preventDefault();

    if((name === null && username === null && email === null && contact === null) ||
      (name === "" && username === "" && email === "" && contact === "")
    ){
      window.alert("Empty Input!!");
    }
    else{
      var doctor_name, doctor_username, doctor_email, doctor_contact;

      if(name){
        doctor_name = name;
      }
  
      if(username){
        doctor_username = username;
      }
  
      if(email){
        doctor_email = email;
      }
  
      if(contact){
        doctor_contact = contact;
      }
  
      try {
        const response = await axios.put(`http://${window.location.hostname}:8000/api/doctor/update/id/${doctorID}`, {
          DoctorID: doctorID,
          DoctorName: doctor_name,
          DoctorUsername: doctor_username,
          DoctorEmail: doctor_email,
          DoctorContact: doctor_contact,
        });
  
        console.log(response.data); // Assuming the response returns a success message
  
        if(response.status === 200){
          window.alert("Update Successful","Update Profile Info successfully!");
          updateProfile();
          window.location.reload(); // Refresh the page
        }
        else {
          window.alert("Update Profile Info failed!");
          updateProfile();
          window.location.reload(); // Refresh the page
        }
  
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error state or display error message to the user
      }
    }
  };

  const updateProfilePassword = async (e) => {
    e.preventDefault();

    if(oldPassword === null || newPassword === null || conPassword === null
       || conPassword !== newPassword || oldPassword !== doctorInfo.DoctorPassword
    ){
      window.alert("Update specialty failed!");
      updatePassword();
      window.location.reload(); // Refresh the page
    }
    else {

      try {
        const response = await axios.put(`http://${window.location.hostname}:8000/api/doctor/update/id/${doctorID}`, {
            DoctorPassword: newPassword
        });
        console.log(response.data); // Assuming the response returns a success message
        window.alert("Update password successful!");
        updatePassword();
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error state or display error message to the user
      }
    }

   
  };

  const updateProfileSpecialty = async (e) => {
    e.preventDefault();

    if(specialty === null){
      window.alert("Empty specialty");
    }
    else {
      try {
        const response = await axios.put(`http://${window.location.hostname}:8000/api/doctor/update/id/${doctorID}`, {
          DoctorSpecialize: specialty
        });
        console.log(response.data); // Assuming the response returns a success message
        window.alert("Update specialty successful!");
        updateSpecialty();
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle error state or display error message to the user
      }
    }

    
  };


  useEffect(() => {
    
    const getDoctorInfo = async () => {
      
      try {
        const response = await fetch(`http://${window.location.hostname}:8000/api/doctor/findDoctor/${doctorID}`);
        
        if (!response.ok) {
          throw new Error('Error retrieving doctor information');
        }
        const data = await response.json();
        setDoctorInfo(data);

        setName(data["DoctorName"]);
        setUsername(data["DoctorUsername"]);
        setEmail(data["DoctorEmail"]);
        setContact(data["DoctorContact"]);
        setSpecialty(data["DoctorSpecialize"]);

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
      <DoctorLayout doctorID={doctorID} active={"Profile"}>
      
        <div class="w-full px-5 pt-3 h-fit overflow-hidden text-center">
          <h1 class="text-xl py-1"><b>Profile</b></h1>
        </div>
      
        {/** Update Profile Modal */}
        {updateProfileModal && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update Profile
                  </h3>
                  <button
                    onClick={updateProfile}
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
                  <form className="space-y-4" onSubmit={updateProfileInfo}>
                    {/* Form inputs */}
                    {/* Your email input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name} // ...force the input's value to match the state variable...
                        onChange={e => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username} // ...force the input's value to match the state variable...
                        onChange={e => setUsername(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Username"
                      />
                    </div>


                    {/* Your password input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Email
                      </label>
                      <input
                        type='text'
                        value={email} // ...force the input's value to match the state variable...
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        
                      />
                    </div>

                     {/* Your password input */}
                     <div style={{ position: 'relative' }}>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Contact
                      </label>
                      <input
                        type='text'
                        value={contact} // ...force the input's value to match the state variable...
                        onChange={e => setContact(e.target.value)}
                        placeholder="Contact"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        
                      />
                    </div>

                    {/* Login button */}
                    <button
                      type="submit"
                      className="mt-3 w-full text-white hover:bg-gradient-to-r from-purple-dark to-red-deep bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Update Profile
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}


        {updatePasswordModal && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update Password
                  </h3>
                  <button
                    onClick={updatePassword}
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
                  <form className="space-y-4" onSubmit={updateProfilePassword} action='POST'>
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
                        placeholder="Old Password"
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
                      <a href="/Doctor/DoctorProfile" className="text-sm text-orange-600 hover:underline">
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

        {/** Update Profile Modal */}
        {updateSpecialtyModal && doctorInfo && (
          <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Update Specialty
                  </h3>
                  <button
                    onClick={updateSpecialty}
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
                  <form className="space-y-4" onSubmit={updateProfileSpecialty} action='POST'>
                    {/* Form inputs */}
                    {/* Your email input */}
                    <div style={{ position: 'relative' }}>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Specialty
                      </label>
                      <textarea
                        type="text"
                        name="Old password"
                        id="Old password"
                        value={specialty}
                        onChange={handleSpecialty}
                        rows={8} // Adjust the number of rows as needed
                        cols={100} // Adjust the number of columns as needed  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your specialty here"
                        maxLength={1000}
                      />
                      {/* Displaying the maxlength counter */}
                       
                         <p className=" text-end">
                          {(specialty === '') ? 0 : specialty.length}/{1000}
                        </p>
                      
                    </div>

                    

                    {/* Login button */}
                    <button
                      type="submit"
                      className="mt-3 w-full text-white hover:bg-gradient-to-r from-purple-dark to-red-deep bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Update Specialty
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
            
            <div className = "claymorphism-card-03 w-full items-center gap-3 h-96">
              
              <div className = "flex justify-center w-full">
                <img src={Logo} alt="Profile" className="p-2 w-28 h-28 rounded-full  bg-white cursor-pointer" />
              </div>

              
              {doctorInfo && (<p className = "text-center text-2xl"><strong>{doctorInfo.DoctorName}</strong></p>)}
              <p className = "text-center text-md">Doctor</p>
              
            
            </div>

            <div className="gap-2">
              
              {/** Card 1 */}
              <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
                <div className ="flex justify-between text-black items-center">
                  <b><h1 className = "text-black text-2xl">Personal Info</h1></b>
                  <div className = "flex"> 
                    <button onClick={updateProfile} className="hover:bg-gray-400 mr-2 p-2 hover:p-2 rounded-lg" title="Edit Profile">
                      <Edit />
                    </button>

                    <button onClick={updatePassword} className="hover:bg-gray-400 ml-2 p-2 hover:p-2 rounded-lg" title="Edit Password">
                      <Lock />
                    </button>
                  </div>

                  
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
              <div className=" mt-2 claymorphism-card-02 w-full h-60 items-center gap-3 text-black">
                
                <div className =" flex justify-between text-black items-center">
                  <b><h1 className = "text-black text-2xl">Specialty</h1></b>
                  <button onClick={updateSpecialty} className="hover:bg-gray-400 ml-2 p-2 hover:p-2 rounded-lg">
                    <Edit />
                  </button>
                </div>

                <hr className="border-1 border-black my-2"></hr>

                <div className="text-black">
                  {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorSpecialize}</p>)}
                </div>

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

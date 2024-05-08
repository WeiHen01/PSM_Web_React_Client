import React, { useState, useEffect, useRef  }  from 'react';
import Trademark from "../../../images/Trademark_color.png";
import Logo from "../../../images/Logo.png";
import { useNavigate } from 'react-router-dom';
import {Bell, LogOut, UserCircle2} from 'lucide-react';

import Onesignal from 'react-onesignal';

const DoctorHeader = ({doctorID, notificationCount, children }) => {

    const navigate = useNavigate();

    const [doctorInfo, setDoctorInfo] = useState(null);

    const Home=()=>{
        navigate("/Doctor/DoctorHome", { state: { doctorID } });
    }

    const Profile=()=>{
        navigate("/Doctor/DoctorProfile", { state: { doctorID } });
    }

    const Logout=()=>{
        const confirmed = window.confirm("Are you sure you want to logout?");
        if(confirmed){
            //OneSignal.removeExternalUserId();
            Onesignal.logout();
            window.alert("You have been logged out!");
            window.location.replace("/Login");
        }
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [isNotifyOpen, setIsNotifyOpen] = useState(false);

    const dropdownRefNotify = useRef(null);

    const toggleNotifyDropdown = () => {
        setIsNotifyOpen(!isNotifyOpen);
    };

    const [profileImage, setProfileImageURL] = useState(''); // Define profileImageURL state

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }

            if (dropdownRefNotify.current && !dropdownRefNotify.current.contains(event.target)) {
                setIsNotifyOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        
        const getDoctorInfo = async () => {
      
            try {
                const response = await fetch(`http://${window.location.hostname}:8000/api/doctor/findDoctor/${doctorID}`);
                
                if (!response.ok) {
                throw new Error('Error retrieving doctor information');
                }
                const data = await response.json();
                setDoctorInfo(data);

                // Fetch doctor's profile image
                const imageResponse = await fetch(`http://${window.location.hostname}:8000/api/doctor/profileImage/${doctorID}`);
                if (!imageResponse.ok) {
                throw new Error('Error retrieving doctor profile image');
                }
                const imageData = await imageResponse.blob();
                setProfileImageURL(URL.createObjectURL(imageData));
        
            } catch (error) {
                console.error('Error fetching doctor info:', error);
                // Handle error state or display error message to the user
            }
            
        };

        getDoctorInfo();

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
  
    return (
        <div className="flex items-center justify-between px-2">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"></link>
            <div className="flex items-center gap-5">
                {children}
                <div className="logo">
                    
                    <img src={Trademark} onClick={Home} alt="Logo" className="w-32 my-2 cursor-pointer" />
                </div>
            </div>
            <div className="flex items-center gap-5">
                
                {/* Notification section */}
                <div className="cursor-pointer" onClick={null} ref={dropdownRefNotify}>
                    <button 
                        className="flex gap-2 hover:text-gray-200 cursor-pointer"
                        onClick={toggleNotifyDropdown}
                    >
                        <Bell />
                        {notificationCount > 0 && (
                            <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs">{notificationCount}</span>
                        )}
                    </button>
                    {/* Dropdown menu */}
                    {isNotifyOpen && (
                        <div
                        id="dropdownHover"
                        className="absolute mt-1 mr-5 px-2 right-1 w-96 bg-white divide-y overflow-x-hidden divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                        >
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                <li>
                                    <p className="block my-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* User profile section */}
                <div className="cursor-pointer flex gap-3" onClick={null} ref={dropdownRef}>
                    <button 
                        className="flex gap-2 hover:text-gray-200 cursor-pointer items-center"
                        onClick={toggleDropdown}
                    >
                        {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        ) : (
                        <img src={Logo} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        )}
                        
                        
                        <div className='flex flex-col items-start'>
                            {/* Display username */}
                            {doctorInfo && (<p className = "flex font-special text-sm font-semibold"><span>{doctorInfo.DoctorName}</span> </p>)}
                        
                            <p className = "font-special text-xs">Doctor</p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 text-sm w-40 bg-white rounded-lg shadow-lg z-10 opacity-100 transition-opacity duration-300">
                            <button onClick={Profile} className= "flex block items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                <UserCircle2/>Profile
                            </button>
                            <button onClick={Logout} className="flex block items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                <LogOut/>Logout
                            </button>
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    )
}

export default DoctorHeader;

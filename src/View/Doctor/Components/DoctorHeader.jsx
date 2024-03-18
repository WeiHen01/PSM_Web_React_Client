import React, { useState, useEffect, useRef  }  from 'react';
import Trademark from "../../../images/Trademark_color.png";
import Logo from "../../../images/Logo.png";
import { useNavigate } from 'react-router-dom';
import {Bell, UserCircle2} from 'lucide-react';

const DoctorHeader = ({ username, notificationCount, children }) => {

    const navigate = useNavigate();

    const Home=()=>{
        navigate("/Doctor/DoctorHome");
    }

    const Profile=()=>{
        navigate("/Doctor/DoctorProfile");
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-5">
                {children}
                <div className="logo">
                    <a href="/Doctor/DoctorHome">
                        <img src={Trademark} onClick={Home} alt="Logo" className="w-32 my-2 cursor-pointer" />
                    </a>
                </div>
            </div>
            <div className="flex items-center gap-5">
                
                {/* Notification section */}
                <div className="cursor-pointer" onClick={null}>
                    <button className="flex gap-2 hover:text-gray-200 cursor-pointer">
                        <Bell />
                        {notificationCount > 0 && (
                            <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs">{notificationCount}</span>
                        )}
                    </button>
                </div>

                {/* User profile section */}
                <div className="cursor-pointer flex gap-3" onClick={null} ref={dropdownRef}>
                    <button 
                        className="flex gap-2 hover:text-gray-200 cursor-pointer items-center"
                        onClick={toggleDropdown}
                    >
                        <img src={Logo} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        
                        <div className='flex flex-col items-start'>
                            <p className = "flex font-special text-sm font-semibold">Username</p>
                            <span>{username}</span> {/* Display username */}

                            <p className = "font-special text-xs">Doctor</p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 text-sm w-40 bg-white rounded-lg shadow-lg z-10 opacity-100 transition-opacity duration-300">
                            <button onClick={Profile} className= "flex block items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                <UserCircle2/>Profile
                            </button>
                            <button onClick={null} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                Settings
                            </button>
                            <button onClick={null} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    )
}

export default DoctorHeader;

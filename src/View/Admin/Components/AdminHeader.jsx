import React, { useState, useEffect, useRef  }  from 'react';
import Trademark from "../../../images/Trademark_color.png";
import Logo from "../../../images/Logo.png";
import { useNavigate } from 'react-router-dom';
import {Bell, LogOut, UserCircle2} from 'lucide-react';

const AdminHeader = ({ adminID, adminName, notificationCount, children }) => {

    const navigate = useNavigate();

    const Home=()=>{
        navigate("/Admin/AdminHome", { state: { adminID, adminName } });
    }

    const Profile=()=>{
        navigate("/Admin/AdminProfile", { state: { adminID, adminName } });
    }

    const Logout=()=>{
        const confirmed = window.confirm("Are you sure you want to logout?");
        if(confirmed){
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

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
  
    return (
        <div className="flex items-center justify-between px-2">
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
                                    <a href="#" className="block my-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
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
                        <img src={Logo} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        
                        <div className='flex flex-col items-start'>
                            <p className = "flex font-special text-sm font-semibold"><span>{adminName}</span> {/* Display username */}</p>
                            
                            <p className = "font-special text-xs">Admin</p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-1 top-4 mt-2 text-sm w-40 bg-white rounded-lg shadow-lg z-10 opacity-100 transition-opacity duration-300">
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

export default AdminHeader;

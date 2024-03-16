import React from 'react';
import Trademark from "../../../images/Trademark_color.png";
import Logo from "../../../images/Logo.png";
import { useNavigate } from 'react-router-dom';
import {Bell} from 'lucide-react';

const AdminHeader = ({ username, notificationCount, children }) => {

    const navigate = useNavigate();

    const Home=()=>{
        navigate("/Doctor/DoctorHome");
    }

    const Profile=()=>{
        navigate("/Doctor/DoctorProfile");
    }
  
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
                <div className="cursor-pointer flex gap-3" onClick={null}>
                    <button 
                        className="flex gap-2 hover:text-gray-200 cursor-pointer items-center"
                        onClick={Profile}
                    >
                        <img src={Logo} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
                        
                        <div className='flex flex-col items-start'>
                            <p className = "flex font-special text-sm font-semibold">Username</p>
                            <span>{username}</span> {/* Display username */}

                            <p className = "font-special text-xs">Doctor</p>
                        </div>
                        
                    </button>
                </div>

                
            </div>
        </div>
    )
}

export default AdminHeader;

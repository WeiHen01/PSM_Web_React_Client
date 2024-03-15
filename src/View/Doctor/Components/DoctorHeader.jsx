import React from 'react';
import Trademark from "../../../images/Trademark_color.png";
import { useNavigate } from 'react-router-dom';

const DoctorHeader = ({ username, notificationCount, children }) => {

    const navigate = useNavigate();

    const Home=()=>{
        navigate("/Doctor/DoctorHome");
    }
  
    return (
        <div className=" flex gap-5 px-2">
        
            {children}
            
            <div className="logo">
                <a href = "/Doctor/DoctorHome">
                    <img src={Trademark} onClick={Home} alt="Logo" className = "w-36 py-1"/>
                </a>
            </div>
        </div>
    )
}

export default DoctorHeader;

import React from 'react';
import Trademark from "../../../images/Trademark_color.png";

const DoctorHeader = ({ username, notificationCount, children }) => {
  return (
    <div className=" flex gap-5 px-2">
      {children}
      <div className="logo">
        <img src={Trademark} alt="Logo" className = "w-36 py-1"/>
      </div>
      <div className="user-info">
        
        <div className="notification">
          <span>{notificationCount}</span>
          {/* Add notification icon or bell icon here */}
        </div>
      </div>
    </div>
  )
}

export default DoctorHeader

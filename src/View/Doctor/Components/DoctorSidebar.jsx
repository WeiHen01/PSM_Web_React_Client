import React, { createContext, useContext, useState } from 'react';
import Trademark from "../../../images/Trademark_color.png";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

const DoctorSidebar = ({children, doctorID, doctorName}) => {
    const [expanded] = useState(true);

    return (
        <aside className = "h-screen relative ">
            <nav className = "relative w-56 flex flex-col bg-white border-r shadow-sm">
                <div className = "flex justify-center w-full h-full">
                    <img src={Trademark} alt = "/" className="my-2 w-32"/>
                </div>
                <div className = "bg-gradient-to-r from-purple-dark to-red-deep h-screen">
                    <SidebarContext.Provider value={{ expanded}}>

                        {/** Render sidebar items  */}
                        <ul className = ' text-white py-6 bg-gradient-to-r from-purple-dark to-red-deep h-auto'>
                            {children}
                        </ul>

                    </SidebarContext.Provider>
                </div>
            </nav>
        </aside> 
    );
}

export default DoctorSidebar;

// Generate the sidebar menu items
export function DoctorSidebarItem({icon, text, active, alert, url, logout, doctorID, doctorName}){
    const { expanded } = useContext(SidebarContext);

    const navigate = useNavigate();
    
    const handleLink = () => {
        if(logout === "/Login"){
            const confirmed = window.confirm("Are you sure you want to logout?");
            if(confirmed){
                window.alert("You have been logged out!");
                window.location.replace("/Login");
            } 
        }
        else {
            navigate(url, { state: { doctorID, doctorName } });
        }
    }

    return(
        // checking the state if the item active then change the css property of that item
        <li 
            className = {`relative flex items-center px-3 py-2 gap-2 cursor-pointer transition-colors group ${active ? "text-orange-400 font-semibold" : "hover:text-pink-400"}`}
            onClick={handleLink}
        >

            <a href={url} className='flex items-center gap-3.5 my-1'>
                {icon}
                <span className='font-special text-sm'>{text}</span>
            </a>
            
            {/** Show if there's new notification */}

            {alert && (
                <div className = {`absolute right-4 rounded w-2 h-2 bg-orange-400`} ></div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}

        </li>
    )
}

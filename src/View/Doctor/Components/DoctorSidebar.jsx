import React, { createContext, useContext, useState } from 'react';
import Logo from "../../../images/Logo.png";
import {MoreVertical} from 'lucide-react';
import { Link } from 'react-router-dom';
import Trademark from "../../../images/Trademark_color.png";

const SidebarContext = createContext();

const DoctorSidebar = ({children}) => {
    const [expanded] = useState(true);

    return (
        <aside className = "h-screen">
            <nav className = "w-56 flex flex-col bg-white border-r shadow-sm">
                <div className = "flex justify-center">
                    <a href = "/Doctor/DoctorHome">
                        <img src={Trademark} alt = "/" className="my-2 w-32"/>
                    </a>
                </div>
                <SidebarContext.Provider value={{ expanded }}>

                    {/** Render sidebar items  */}
                    <ul className = 'flex-1 text-white py-6 bg-gradient-to-r from-purple-dark to-red-deep'>{children}</ul>

                </SidebarContext.Provider>


                {/** Profile Image */}
                <div className="border-t flex p-3 gap-3 bg-white items-center justify-between">
                    {/* Profile Image and Username/Email Details */}
                    <div className="flex gap-4 flex-1 items-center h-56">
                        <div>
                            <img src={Logo} alt = "/" className="w-10 h-10 rounded-full"/>
                        </div>
                        
                        {/* Username and Email Details */}
                        <div className='leading-4'>
                            <h4 className='font-special font-semibold'>Username</h4>
                            <span className='text-xs font-special'>email</span>
                        </div>
                    </div>
                    
                    <button>
                        <MoreVertical />
                    </button>
                </div>

            </nav>
        </aside> 
    );
}

export default DoctorSidebar;

// Generate the sidebar menu items
export function DoctorSidebarItem({icon, text, active, alert, url}){
    const { expanded } = useContext(SidebarContext);

    return(
        // checking the state if the item active then change the css property of that item
        <li 
            className = {`relative flex items-center px-3 py-2 gap-2 cursor-pointer transition-colors group ${active ? "text-orange-400 font-semibold" : "hover:text-pink-400"}`}
        >

            <a href={url} className='flex items-center gap-3.5 my-1'>
                {icon}
                <span className='font-special text-sm'>{text}</span>
            </a>
            
            {/** Show if there's new notification */}

            {alert && (
                <div className = {`absolute right-2 rounded w-2 h-2 bg-orange-400`} ></div>
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}

        </li>
    )
}

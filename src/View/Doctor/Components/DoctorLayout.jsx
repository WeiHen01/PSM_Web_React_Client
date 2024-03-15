import React, {useState} from "react";
import DoctorHeader from "./DoctorHeader";
import DoctorSidebar, {DoctorSidebarItem} from "./DoctorSidebar";
import {HomeIcon, SettingsIcon, LayoutDashboard, ChevronLeft, Menu, LogOutIcon, MessageSquare, Book} from 'lucide-react';

const DoctorLayout = ({children, active}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className = "flex flex-col">
            
            {/* Main content and sidebar */}
            <div className="flex ">
                {/* Sidebar */}
                <div className={`overflow-hidden transition-all ${expanded ? "w-56" : "w-0"} bg-white border-r shadow-sm`}>
                    
                    <DoctorSidebar>
                        <DoctorSidebarItem icon={<HomeIcon size={20} />} text="Home" url="/Doctor/DoctorHome" />
                        <DoctorSidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" url="/Doctor/DoctorHome" />
                        <DoctorSidebarItem icon={<MessageSquare size={20} />} text="Chat" />
                        <DoctorSidebarItem icon={<Book size={20} />} text="Report" />
                        <hr className="my-4"></hr>

                        <DoctorSidebarItem icon={<SettingsIcon size={20} />} text="Settings" />
                        <DoctorSidebarItem icon={<LogOutIcon size={20} />} text="Log out" url="/" />
                    </DoctorSidebar>
                </div>

                
            

                {/* Content Area */}
                
                <div className='font-special flex-grow h-screen overflow-hidden bg-gradient-to-r from-purple-dark to-red-deep '>
                    {/* Header */}
                    <div className="bg-white">
                        <DoctorHeader>
                            <button onClick={() => setExpanded((curr) => !curr)} className="hover:text-gray-400">
                                {expanded ? <ChevronLeft /> : <Menu />}
                            </button>
                        </DoctorHeader>
                    </div>

                    {children}

                </div>

                
            </div>
            
        </div>
    );
   
}
// variable for  the pages to  be imported
export default DoctorLayout;

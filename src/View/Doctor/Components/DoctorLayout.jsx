import React, {useState} from "react";
import DoctorHeader from "./DoctorHeader";
import DoctorSidebar, {DoctorSidebarItem} from "./DoctorSidebar";
import {HomeIcon, LayoutDashboard, ChevronLeft, Menu, LogOutIcon, MessageSquare, Book} from 'lucide-react';


const DoctorLayout = ({children, doctorID, doctorName}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className = "flex flex-col">
            
            {/* Main content and sidebar */}
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className={`overflow-hidden transition-all ${expanded ? "w-56" : "w-0"} bg-white border-r shadow-sm`}>
                    
                    <DoctorSidebar>
                        <DoctorSidebarItem doctorID={doctorID} doctorName={doctorName} icon={<HomeIcon size={20} />} text="Home" url="/Doctor/DoctorHome" />
                        <DoctorSidebarItem doctorID={doctorID} doctorName={doctorName} icon={<LayoutDashboard size={20} />} text="Dashboard" url="/Doctor/DoctorHome" />
                        <DoctorSidebarItem doctorID={doctorID} doctorName={doctorName} icon={<MessageSquare size={20} />} text="Chat" url="/Doctor/DoctorChat" />
                        <DoctorSidebarItem doctorID={doctorID} doctorName={doctorName} icon={<Book size={20} />} text="Report"  url="/Doctor/DoctorReport" />
                        <hr className="my-4"></hr>
                        
                        <DoctorSidebarItem icon={<LogOutIcon size={20} />} text="Log out" logout="/Login" />
                    </DoctorSidebar>
                </div>


                {/* Content Area */}
                
                <div className='font-special flex-grow h-screen bg-gradient-to-b from-gray-200 to-gray-400'>
                    {/* Header */}
                    <div className="bg-white">
                        <DoctorHeader doctorID = {doctorID} doctorName={doctorName}>
                            <button onClick={() => setExpanded((curr) => !curr)} className="pl-3 hover:text-gray-400">
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

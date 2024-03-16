import React, {useState} from "react";
import {HomeIcon, SettingsIcon, LayoutDashboard, ChevronLeft, Menu, LogOutIcon, MessageSquare, Book} from 'lucide-react';

const AdminLayout = ({children, active}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className = "flex flex-col">
            
            {/* Main content and sidebar */}
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className={`overflow-hidden transition-all ${expanded ? "w-56" : "w-0"} bg-white border-r shadow-sm`}>
                    
                </div>

                
            

                {/* Content Area */}
                
                <div className='font-special flex-grow h-full bg-gradient-to-b from-gray-200 to-gray-400'>
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
export default AdminLayout;


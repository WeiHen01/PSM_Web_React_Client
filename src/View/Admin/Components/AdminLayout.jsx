import React, {useState} from "react";
import {HomeIcon, SettingsIcon, LayoutDashboard, ChevronLeft, Menu, LogOutIcon, Stethoscope, Book} from 'lucide-react';
import AdminSidebar, { AdminSidebarItem } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({children}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className = "flex flex-col">
            
            {/* Main content and sidebar */}
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className={`overflow-hidden transition-all ${expanded ? "w-56" : "w-0"} bg-white border-r shadow-sm`}>
                    
                    <AdminSidebar>
                        <AdminSidebarItem icon={<HomeIcon size={20} />} text="Home" url="/Doctor/DoctorHome" />
                        <AdminSidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" url="/Doctor/DoctorHome" />
                        <AdminSidebarItem icon={<Book size={20} />} text="Report" url="/Doctor/DoctorReport"/>
                        <AdminSidebarItem icon={<Stethoscope size={20} />} text="Doctor Page" url="/Doctor/DoctorHome"/>
                        <hr className="my-4"></hr>

                        <AdminSidebarItem icon={<SettingsIcon size={20} />} text="Settings" />
                        <AdminSidebarItem icon={<LogOutIcon size={20} />} text="Log out" url="/Login" />
                    </AdminSidebar>
                </div>

                
            

                {/* Content Area */}
                
                <div className='font-special flex-grow h-screen bg-gradient-to-b from-gray-200 to-gray-400'>
                    {/* Header */}
                    <div className="bg-white">
                        <AdminHeader>
                            <button onClick={() => setExpanded((curr) => !curr)} className="pl-3 hover:text-gray-400">
                                {expanded ? <ChevronLeft /> : <Menu />}
                            </button>
                        </AdminHeader>
                    </div>

                    {children}

                </div>

                
            </div>
            
        </div>
    );
   
}
// variable for  the pages to  be imported
export default AdminLayout;

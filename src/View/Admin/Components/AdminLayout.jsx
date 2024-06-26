import React, {useState} from "react";
import {HomeIcon, ChevronLeft, Menu, LogOutIcon, User} from 'lucide-react';
import AdminSidebar, { AdminSidebarItem } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({children, adminID, active}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className = "flex flex-col">
            
            {/* Main content and sidebar */}
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className={`overflow-hidden  transition-all ${expanded ? "w-56" : "w-0"} bg-gradient-to-r from-purple-dark to-red-deep border-r shadow-sm `}>
                    
                    <AdminSidebar>
                        <AdminSidebarItem adminID={adminID} icon={<HomeIcon size={20} />} text="Home" url="/Admin/AdminCtrlUser" active = {active === 'Home' ? 'active' : null}/>
                        <AdminSidebarItem adminID={adminID} icon={<User size={20} />} text="Profile" url="/Admin/AdminProfile" active = {active === 'Profile' ? 'active' : null}/>

                        <hr className="my-4"></hr>

                        <AdminSidebarItem icon={<LogOutIcon size={20} />} text="Log out" logout="/Login" />
                    </AdminSidebar>
                </div>

                
                {/* Content Area */}
                
                <div className='font-special flex-grow flex-col min-h-screen h-max bg-gradient-to-b from-gray-200 to-gray-400'>
                    {/* Header */}
                    <div className="bg-white">
                        <AdminHeader adminID = {adminID}>
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

import React from "react";
import Trademark from "../../../images/Trademark_color.png";
import "../../../index.css";
import { Bell } from 'lucide-react';

const DoctorHeader = ({children}) => {
    
    return (
        <section>
            <header className = "container mx-auto py-2 gap-5 items-center flex justify-between" style = {{fontFamily: 'Poppins'}} >
                {children}

                <div>
                    <a href = "/Doctor/DoctorHome">
                        <img src = {Trademark} alt = "Logo" style={{ width: '15%', }} />
                    </a>
                </div>
                
                {/** The Navigation links here */}
                {/* Right side: Notifications and Profile */}
                <div className="flex items-center space-x-4 justify-between">
                    <button className="hover:text-gray-400">
                        <Bell />
                    </button>
                    <div>
                        <button className="flex items-center space-x-2 hover:text-gray-400">
                            <img
                                className="w-8 h-8 rounded-full"
                                src="profile.jpg"
                                alt="Profile"
                            />
                            <span className="font-semibold">Username</span>
                        </button>
                    </div>
                </div>

            </header>
        </section>
		
    );
};

export default DoctorHeader;
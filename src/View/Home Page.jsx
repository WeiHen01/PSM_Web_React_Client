/**
 * Home Page: Default Landing Page of the web application
 */

import React from "react";
import MainLayout from "../Component/MainLayout";
import Health from "../images/blood.png";
import Marquee from "react-fast-marquee";

const HomePage = () => {


    return (
        // Recall the component in MainLayout.js
        <MainLayout>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"></link>
            <title>BITU3973 | EpiHealth Monitoring System</title>
            <Marquee speed={100} className=" font-special text-sm py-1" style={{ backgroundColor: '#FF4081'}}>
                Welcome to EpiHealth Monitoring System!
            </Marquee>
            <div style = {{fontFamily: 'Poppins, sans-serif'}} className="bg-gradient-to-r from-purple-dark to-red-deep min-h-max h-max ">
                <div className="grid grid-cols-2 items-center ">
                    <img src={Health} className="px-3 w-[570px]" alt="welcome" />
                    <div className="grid grid-cols-1">
                        <p className="font-special text-white">Have you ever thought about your health?</p>
                        <p className="font-special text-white">Get started now!</p>
                    </div>
                </div>
            </div>
            
        </MainLayout>
    );
}

export default HomePage;
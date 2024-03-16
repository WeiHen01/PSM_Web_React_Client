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
            <title>BITU3973 | EpiHealth Monitoring System</title>
            <Marquee speed={100} className=" font-special text-sm py-1" style={{ backgroundColor: '#FF7F50'}}>
                Welcome to EpiHealth Monitoring System!
            </Marquee>
            <div className="bg-gradient-to-r from-purple-dark to-red-deep h-auto ">
                <div className="grid grid-cols-2 grid-rows-1 items-center ">
                    <img src={Health} className="px-5 h-96" alt="welcome" />
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
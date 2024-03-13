/**
 * Home Page: Default Landing Page of the web application
 */

import React from "react";
import MainLayout from "../Component/MainLayout";
import Health from "../images/blood.png";

const HomePage = () => {
    return (
        // Recall the component in MainLayout.js
        <MainLayout>
            <div className="bg-gradient-to-r from-purple-dark to-red-deep h-full w-full">
                <div className="grid grid-cols-2 grid-rows-1 items-center">
                    <img src={Health} className="w-50 h-screen px-5" alt="welcome" />
                    <div className="grid grid-cols-1">
                        <p className="font-special text-white">Have you ever thought about your health?</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default HomePage;
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Health from "../images/blood.png";

const MainLayout = () => {
    return (
        <div>
            <Header />
                <div className="bg-gradient-to-r from-purple-dark to-red-deep h-full w-full">
                    <div className="grid grid-cols-2 grid-rows-1 items-center">
                        <img src={Health} className = "w-50 h-screen px-5" alt= "welcome"/>
                        <div className="grid grid-cols-1">
                            <p className="font-special text-white">Have you ever think about your health?</p>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
   
}
// variable for  the pages to  be imported
export default MainLayout;
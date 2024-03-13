import React from "react";
import images from "../Constants/images";
import "./Style.css";

const Header = () => {
    return (
        <section>
            <header className = "container mx-auto px-5 py-4 items-center flex justify-between" style = {{fontFamily: 'Poppins'}} >
                {/** The Logo here */}
                <div>
                    <img src = {images.Trademark} alt = "Logo" style={{ width: '20%', }} />
                </div>
                
                {/** The Navigation links here */}
                <div className = "flex gap-x-9 items-center">
                    <ul className = "flex gap-x-5 font-semibold ">
                        <li>
                            <a href="/" className="hover:text-gradient duration-300">Home</a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gradient duration-300">Articles</a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-gradient duration-300">FAQ</a>
                        </li>
                    </ul>
                    <button className = "px-6 py-2 rounded-full bg-clip-text font-bold border-2  hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300"
                        
                    >
                        Login
                    </button>
                    
                </div>

            </header>
        </section>
    );
};

export default Header;
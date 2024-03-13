import React from "react";
import images from "../Constants/images";
import "./Header.css";

const Header = () => {
    return (
        <section>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/** The Logo here */}
                <div>
                    <img src = {images.Trademark} alt = "Logo" style={{ width: '15%', height: '5%' }} />
                </div>
                
                {/** The Navigation links here */}
                <div className = "flexContainer">
                    <ul className = "navLinks">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Articles</a>
                        </li>
                        <li>
                            <a href="/">FAQ</a>
                        </li>
                    </ul>
                    <button className = "loginButton">Login</button>
                </div>

            </header>
        </section>
    );
};

export default Header;
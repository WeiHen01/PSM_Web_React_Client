import React from "react";
import Trademark from "../Constants/Trademark";
import "./Style.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    const Register=()=>{
        navigate("/Register");
    }

    return (
        <section>
            <header className = "container mx-auto px-5 py-1 items-center flex justify-between" style = {{fontFamily: 'Poppins'}} >
                {/** The Logo here */}
                <div>
                    <a href = "/">
                        <img src = {Trademark.Trademarks} alt = "Logo" style={{ width: '11vw', }} />
                    </a>
                </div>
                
                {/** The Navigation links here */}
                <div className = "flex gap-x-9 items-center">
                    <ul className = "flex gap-x-5 font-semibold ">
                        <li>
                            <a href="/" className="hover:text-orange-500 duration-300">Home</a>
                        </li>

                        <li>
                            <a href="/Login" className="hover:text-orange-500 duration-300">Login</a>
                        </li>
                        
                    </ul>
                    <button className = "px-6 py-2 rounded-full font-bold border-2 border-orange-400 hover:bg-gradient-to-r from-purple-dark to-red-deep hover:text-white duration-300"
                        type="button" 
                        onClick={() => Register()}
                    >
                        Get Started
                    </button>
                    
                </div>

            </header>
        </section>
    );
};

export default Header;
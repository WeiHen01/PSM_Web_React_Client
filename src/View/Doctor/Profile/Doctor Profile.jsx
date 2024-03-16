import React from 'react'
import DoctorLayout from '../Components/DoctorLayout'
import '../Doctor Style.css';
import Logo from '../../../images/Logo.png'
import {Edit} from 'lucide-react';

const DoctorProfile = () => {
  

  return (
    <div>
      <title>BITU3973 | Doctor Profile</title>
      <DoctorLayout>
      <div class="w-full px-6 py-6 mx-auto h-max overflow-hidden">
        
        <h1 class="text-xl"><b>User Profile</b></h1>
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap -mx-3 my-3 gap-3 justify-center">
          
          <div className="claymorphism-card-01 w-full flex items-center gap-3">
            <img src = {Logo} className = " w-32 h-32 p-2 rounded-full border-4 border-gradient bg-white " alt = "avatar"/>

            <div className="claymorphism-card-header p-3 ">
              <p><b>Name</b></p>
              <div className="claymorphism-card-content mt-2">
                <p>abc@gmail.com</p>
                <p>Registered in 16 March 2024</p>
              </div>
            </div>
          </div>

        </div>
        
        {/** <!-- row 2 --> */}
        <div class= "flex -mx-3 group justify-center">
          
          <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
            <div className ="flex justify-between text-black items-center">
              <b><h1 className = "text-black text-2xl">Personal Info</h1></b>
              <Edit />
            </div>

            <hr className="border-1 border-black my-2"></hr>
            
            <div className ="flex justify-between mr-10 text-black">
              <div>
                <h1 className = "text-l">Full name</h1>
                <p className = "font-semibold">This is me</p>
              </div>

              <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

              <div>
                <h1 className = "text-l">Email</h1>
                <p className = "font-semibold">This is me</p>
              </div>

              <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

              <div>
                <h1 className = "text-l">Email</h1>
                <p className = "font-semibold">This is me</p>
              </div>
              
            </div>

            <div className =" mt-7 flex justify-between text-black items-center">
              <b><h1 className = "text-black text-2xl">Bio</h1></b>
              <Edit />
            </div>

            <hr className="border-1 border-black my-2"></hr>
            
          </div>

        </div>
        

      </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorProfile

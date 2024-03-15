import React from 'react';
import DoctorLayout from './Components/DoctorLayout';
import "./Doctor Home Style.css";

const DoctorHome = () => {

  return (
    <div>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout>
      {/* <!-- cards --> */}
      <div class="w-full px-6 py-6 mx-auto">
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap -mx-3">
          
          <div class="large-banner">
            <h2>Explore a World of Clay</h2>
              <a href="/Doctor/DoctorHome" title="Explore">
                Take a Look
              </a>
          </div>

        </div>

        {/** <!-- row 2 --> */}
        <div class= "flex flex-wrap -mx-3 group justify-between">
          
          <div class ="smaller-card">
            <div className = "m-3 flex">
              <p>ABC</p>
              <p>This is very good to play</p>
            </div>
          </div>

          <div class ="smaller-card">
            <div className = "m-3 flex">
              <p>DEF</p>
              <p>This is very good to play</p>
            </div>
          </div>

          <div class ="smaller-card">
            <div className = "m-3 flex">
              <p>GHI</p>
              <p>This is very good to play</p>
            </div>
          </div>

        </div>
      </div>
      
      </DoctorLayout>
    </div>
    
  );
}

export default DoctorHome;
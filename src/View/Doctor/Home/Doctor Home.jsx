import React from 'react';
import DoctorLayout from '../Components/DoctorLayout';

const DoctorHome = () => {

  return (
    <div>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout>
      <div class="w-full px-6 pt-6 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Dashboard</b></h1>
      </div>
      {/* <!-- cards --> */}
      <div class="w-full px-6 py-6 mx-auto h-fit overflow-hidden ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap -mx-3 justify-between">
          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p>Temperature</p>
            </div>
            <div className="claymorphism-card-content">
              <p>Record</p>
            </div>
          </div>

          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p>Pulse</p>
            </div>
            <div className="claymorphism-card-content">
              <p>Record</p>
            </div>
          </div>

          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p>Hello world</p>
            </div>
            <div className="claymorphism-card-content">
              <p>Hello world</p>
            </div>
          </div>

          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p>Hello world</p>
            </div>
            <div className="claymorphism-card-content">
              <p>Hello world</p>
            </div>
          </div>

          
        </div>

        {/** <!-- row 2 --> */}
        <div class= "flex flex-wrap -mx-3 group justify-between">
          
          

        </div>
      </div>
      
      </DoctorLayout>
    </div>
    
  );
}

export default DoctorHome;
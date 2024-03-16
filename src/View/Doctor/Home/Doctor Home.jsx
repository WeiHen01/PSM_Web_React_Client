import React from 'react';
import DoctorLayout from '../Components/DoctorLayout';

const DoctorHome = () => {

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout>
      
      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Dashboard</b></h1>
      </div>
      {/* <!-- cards --> */}
      <div class="w-full px-5 py-6 mx-auto h-fit overflow-hidden ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 justify-between">
          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p className="font-semibold">Temperature</p>
            </div>
            <div className="claymorphism-card-content">
              <p>Record</p>
            </div>
          </div>

          <div className="claymorphism-card">
            <div className="claymorphism-card-header">
              <p className='font-semibold'>Pulse</p>
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

        <div class="w-full pt-6 h-fit overflow-hidden ">
          <h1 class="text-xl"><b>Recent Record</b></h1>
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
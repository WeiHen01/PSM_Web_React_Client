import React from 'react';
import DoctorLayout from '../Components/DoctorLayout';
import { Thermometer, HeartPulse } from "lucide-react";
import { useLocation } from 'react-router-dom';

const DoctorHome = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
      
      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Dashboard</b></h1>
      </div>
      {/* <!-- cards --> */}
      <div class="w-full px-5 py-6 mx-auto h-fit overflow-hidden ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-4">
          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className="font-semibold">Recent Temperature</p>
              </div>
              <div className="claymorphism-card-content">
                <p>Record °C</p>
              </div>
            </div>
            <Thermometer size={50}/>
          </div>

          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold'>Recent Pulse</p>
              </div>
              <div className="claymorphism-card-content">
                <p>Record bpm</p>
              </div>
            </div>
            <HeartPulse size={50} />

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
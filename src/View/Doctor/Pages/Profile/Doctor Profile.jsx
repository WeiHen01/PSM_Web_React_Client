import React, {useState, useEffect} from 'react'
import DoctorLayout from '../../Components/DoctorLayout'
import '../../Doctor Style.css';
import Logo from '../../../../images/Logo.png'
import {Edit} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    
    const getDoctorInfo = async () => {
      
      try {
        const response = await fetch(`http://localhost:8000/api/doctor/findDoctor/${doctorID}`);
        
        if (!response.ok) {
          throw new Error('Error retrieving doctor information');
        }
        const data = await response.json();
        setDoctorInfo(data);

      } catch (error) {
        console.error('Error fetching doctor info:', error);
        // Handle error state or display error message to the user
      }
    };

    getDoctorInfo(); // Call the function when component mounts
    
  }, [doctorID]);
  
  return (
    <div className = "overflow-hidden" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
      
        <div class="w-full px-5 pt-3 h-fit overflow-hidden text-center">
          <h1 class="text-xl py-1"><b>Profile</b></h1>
        </div>

      {/* <!-- cards --> */}
      <div class="w-full px-5 py-2 mx-auto h-fit overflow-hidden ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-3 justify-center">
          
          <div className = "claymorphism-card-03 w-full items-center gap-3">
            
            <div className = "flex justify-center w-full">
              <img src={Logo} alt="Profile" className="p-2 w-28 h-28 rounded-full  bg-white cursor-pointer" />
            </div>

            <p className = "text-center text-2xl"><strong>{doctorName}</strong></p>
            <p className = "text-center text-md">Doctor</p>

            {doctorInfo && (<p className = "text-center font-semibold">{doctorInfo.DoctorEmail}</p>)}

            <p className = "text-center text-sm mt-6">This is my introduction</p>
          
          </div>

          <div className="gap-2">
            
            {/** Card 1 */}
            <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
              <div className ="flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Personal Info</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

              <div className ="flex justify-between mr-10 text-black">
                
                <div>
                  <h1 className = "text-l">Full name</h1>
                  <p className = "font-semibold">{doctorName}</p>
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorEmail}</p>)}
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  {doctorInfo && (<p className = "font-semibold">{doctorInfo.DoctorEmail}</p>)}
                </div>

              </div>

              <div className =" mt-7 flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Bio</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

            </div>

            {/** Card 2 */}
            <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
              <div className ="flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Account</h1></b>
                <button>
                  <Edit />
                </button>
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
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

            </div>

          </div>

          

        </div>


        {/** <!-- row 2 --> */}
        <div class= "flex flex-wrap -mx-3 group justify-between">
          
          

        </div>


      </div>
      
      </DoctorLayout>
    </div>
  )
}

export default DoctorProfile

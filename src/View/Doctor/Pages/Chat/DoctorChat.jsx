import React, { useState, useEffect } from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const DoctorChat = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID } = state;

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
    <div className=' h-full'>
      
      <title>BITU3973 | Doctor Chat</title>
      <DoctorLayout doctorID={doctorID} active = {'Chat'}>
        
        <div className="h-fit px-6 py-3">
          
          <h1 class="text-xl"><b>Doctor Chat</b></h1>

          <div class="mt-4 w-92 h-[75vh] bg-red-50 flex flex-row">

            {/** Left-container */}
            <div className="left h-full bg-[#ffffff] w-[30%] flex flex-col justify-between">
              
              {/** Headers */}
              <div className=" h-20 bg-gradient-to-r from-purple-dark to-red-deep text-white p-2">
                
              </div>
              
              {/** Scrollable */}
              <div className='p-3 bg-orange-200 overflow-y-auto'>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                
              </div>

              
              
              
            </div>

             {/** Right-container */}
            <div className="right h-full w-[70%] flex flex-col justify-between">
              
              <div className=" h-20 bg-gradient-to-r from-purple-dark to-red-deep text-white p-3">
              {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
              </div>

              {/** Chat contents with bubbles */}
              <div className='h-full p-3 bg-orange-200 overflow-y-auto'>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
                {doctorInfo && ( <p className="font-bold text-lg"><span>{doctorInfo.DoctorName}</span> </p>)}
                <p className="text-sm">Online</p>
              </div>



              {/** Input field for sending message */}

              <div style={{ position: 'relative' }} className =" h-16 flex bg-gradient-to-r from-purple-dark to-red-deep text-white p-3 mt-auto">
                
                  <FontAwesomeIcon
                    icon={faMessage}
                    style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                  />

                  <input 
                    placeholder="Email" 
                    className="w-full pl-14 pr-2 py-2 bg-gray-100 text-black" 
                    style={{ paddingLeft: '35px', width: '100%' }} 
                  />

                  {/* Button beside the input */}
                  <button
                    className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => {
                      // Handle button click
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>


                

              </div>


            </div>

          </div>




        </div>

      </DoctorLayout>

    </div>
  )
}

export default DoctorChat;

import React from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';
import './DoctorChat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const DoctorChat = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  return (
    <div className=' h-full'>
      
      <title>BITU3973 | Doctor Chat</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
        
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
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>

                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
              </div>

              
              
              
            </div>

             {/** Right-container */}
            <div className="right h-full w-[70%] flex flex-col justify-between">
              
              <div className=" h-20 bg-gradient-to-r from-purple-dark to-red-deep text-white p-3">
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
              </div>

              {/** Chat contents with bubbles */}
              <div className='h-full p-3 bg-orange-200 overflow-y-auto'>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>
                <p className="font-bold text-lg">{doctorName}</p>
                <p className="text-sm">Online</p>

                <p className="font-bold text-lg">{doctorName}</p>
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
                    className="ml-2 px-4 py-2 bg-orange-400 text-white rounded-md"
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

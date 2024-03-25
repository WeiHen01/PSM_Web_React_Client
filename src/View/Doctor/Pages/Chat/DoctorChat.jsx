import React from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';

const DoctorChat = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  return (
    <div>
      <title>BITU3973 | Doctor Chat</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
        <div className="chat-app px-6 py-3">
          <h1 class="text-xl"><b>Doctor Chat</b></h1>

          




        </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorChat;

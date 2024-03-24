import React from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';

const DoctorReport = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  return (
    <div>
      <title>BITU3973 | Doctor Report</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
        <div class="w-full px-6 pt-3 h-fit overflow-hidden ">
          <h1 class="text-xl"><b>Report</b></h1>
        </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorReport;
import React from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Import PDF viewer styles

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


          <div style={{ width: '100%', height: '80vh' }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl='https://pdfobject.com/pdf/sample.pdf' />
            </Worker>
          </div>
        </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorReport;
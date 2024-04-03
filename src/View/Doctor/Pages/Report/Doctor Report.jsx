import React from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css'; // Import PDF viewer styles

import {getFilePlugin} from '@react-pdf-viewer/get-file';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

import { zoomPlugin } from '@react-pdf-viewer/zoom';


const DoctorReport = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID, doctorName } = state;

  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;

  const zoomPluginInstance = zoomPlugin();
  const {ZoomIn, ZoomOut } = zoomPluginInstance;

  // Extract the filename from the URL
  const getFileNameFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };

  const fileUrl = 'https://pdfobject.com/pdf/sample.pdf'; // Example file URL
  const extractedFileName = getFileNameFromUrl(fileUrl);

  return (
    <div>
      <title>BITU3973 | Doctor Report</title>
      <DoctorLayout doctorID={doctorID} doctorName={doctorName}>
        <div class="w-full px-6 pt-3 h-fit overflow-hidden ">
          <h1 class="text-xl pb-2"><b>Report</b></h1>


          <div style={{ height: '80vh' }}>
           
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'linear-gradient(to right, #301847, #C10214)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        padding: '5px',
                        color: '#FFFFFF', // Set icon color to white
                    }}

                    className='justify-between p-4'
                >
                    <div className='px-4'>
                      {/** Display the filename */}
                      <p>{extractedFileName}</p>
                    </div>
                    


                    <div className='px-4'>
                      <Download>
                        {(props) => (
                            <button
                                style={{
                                    // Add your styles here
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={props.onClick}
                                className='pl-2'
                                title='Download'
                            >
                              <FontAwesomeIcon icon={faDownload} size='20'/>
                                
                            </button>
                        )}
                      </Download>


                      <ZoomIn>
                        {(props) => (
                            <button
                                style={{
                                    // Add your styles here
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={props.onClick}
                                className='pl-2'
                                title='Zoom In'
                            >
                                <FontAwesomeIcon icon={faSearchPlus} size='20'/>
                            </button>
                        )}
                      </ZoomIn>


                      {/* Zoom Out Button */}
                      <ZoomOut>
                        {(props) => (
                            <button
                                style={{
                                    // Add your styles here
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={props.onClick}
                                className='pl-2'
                                title='Zoom Out'
                            >
                                <FontAwesomeIcon icon={faSearchMinus} size='20'/>
                            </button>
                        )}
                      </ZoomOut>
                    </div>





                    



                </div>
            
                <Viewer 
                  fileUrl='https://pdfobject.com/pdf/sample.pdf' 
                  plugins={[getFilePluginInstance, zoomPluginInstance]}
                  defaultScale={1.3} // Adjust default zoom level as needed
                >
                </Viewer>

            </Worker>
          </div>


          

        </div>
      </DoctorLayout>
    </div>
  )
}

export default DoctorReport;
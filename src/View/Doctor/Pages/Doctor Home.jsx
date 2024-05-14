import React, {useEffect ,useState}  from 'react';
import DoctorLayout from '../Components/DoctorLayout';
import { Thermometer, HeartPulse, User } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

import axios from 'axios';

const DoctorHome = () => {

  /**
   * Function to retrieve list of patients
   */
  // State to store the list of doctors
  const [patients, setPatients] = useState([]);
  // Function to fetch list of doctors
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/patient`); // Adjust the API endpoint as per your backend routes
      setPatients(response.data);
      console.log(`Patient list: ${patients}`);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const [searchPatientQuery, setSearchPatientQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Fetch doctors on component mount
  useEffect(() => {
    fetchPatients();
  });

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.PatientName.toLowerCase().includes(searchPatientQuery.toLowerCase())
      )
    );
  }, [searchPatientQuery, patients]);


  const calculateTimeDifference = (dateTime) => {
    const currentTime = new Date();
    const previousTime = new Date(dateTime);
    const difference = Math.abs(currentTime - previousTime);
    const minutes = Math.floor(difference / 60000);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return previousTime.toLocaleString();
    }
  };


  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID } = state;

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout doctorID={doctorID} active = {'Home'}>
      
      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Dashboard</b></h1>
      </div>
      {/* <!-- cards --> */}
      <div class="w-full px-5 py-6 mx-auto h-fit overflow-hidden items-stretch ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-4">
          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className="font-semibold">Recent Record</p>
              </div>
              <div className="claymorphism-card-content">
                <p className="text-sm">Temperature (°C)</p>
              </div>
            </div>
            <Thermometer size={50}/>
          </div>

          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold'>Recent Record</p>
              </div>
              <div className="claymorphism-card-content">
              <p className="text-sm">Pulse (bpm)</p>
              </div>
            </div>
            <HeartPulse size={50} />

          </div>

          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold'>Numbers</p>
              </div>
              <div className="claymorphism-card-content">
              <p className="text-sm">Total Patients</p>
              </div>
            </div>
            <User size={50} />

          </div>

         
          
        </div>


        {/** <!-- row 2 --> */}
        <div class= "flex flex-wrap -mx-3 group justify-between">
          
          

        </div>


      </div>


      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Patients</b></h1>
      </div>

      {/* <!-- cards --> */}
      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-4">
          <div class=" relative overflow-x-auto h-80 w-2/3 overflow-y-auto shadow-md sm:rounded-lg">
                
                <div class="p-4 bg-gradient-to-r from-purple-dark to-red-deep">
                    <label label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search" value={searchPatientQuery} onChange={(e) => setSearchPatientQuery(e.target.value)} class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search patients" />
                    </div>
                </div>
    
                <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            
                            <th scope="col" class="px-6 py-3">
                                Patient
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last Login
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last Update
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {filteredPatients.map((patient, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                <p className="font-bold">{patient.PatientName}</p>
                                <p>{patient.PatientEmail}</p>
                            </td>
                            <td className="px-6 py-4">{calculateTimeDifference(patient.LastLoginDateTime)}{/* {new Date(patient.LastLoginDateTime).toLocaleString()} */}</td>
                            <td className="px-6 py-4">{calculateTimeDifference(patient.LastUpdateDateTime)}</td>
                            <td className="px-6 py-4">
                                <FaEdit size={30}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    
                </table>
    
            </div>
    
    
            <div class= "relative overflow-x-auto h-80 w-1/4 overflow-y-auto shadow-md sm:rounded-lg">
                    
                <div class="p-4 bg-gradient-to-r from-purple-dark to-red-deep">
                    
                    <div class="relative mt-1">
                      <p className='text-white'>Today Average Record</p>
                    </div>

              
                </div>

                <div>
                        
                </div>
    
                
    
            </div>
        </div>
        


      </div>
      
      </DoctorLayout>
    </div>
    
  );
}

export default DoctorHome;
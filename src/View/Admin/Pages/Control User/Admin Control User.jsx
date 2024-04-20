import React, {useEffect ,useState} from 'react'
import AdminLayout from '../../Components/AdminLayout';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

const AdminControlUser = () => {
  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { adminID, adminName } = state;

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

  // State to store the list of doctors
  const [doctors, setDoctors] = useState([]);
  // Function to fetch list of doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/doctor`); // Adjust the API endpoint as per your backend routes
      setDoctors(response.data);
      console.log(`Doctor list: ${doctors}`);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const [searchPatientQuery, setSearchPatientQuery] = useState('');
  const [searchDoctorQuery, setSearchDoctorQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  

  // Fetch doctors on component mount
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  });

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.PatientName.toLowerCase().includes(searchPatientQuery.toLowerCase())
      )
    );
  }, [searchPatientQuery, patients]);

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.DoctorName.toLowerCase().includes(searchDoctorQuery.toLowerCase())
      )
    );
  }, [searchDoctorQuery, doctors]);


  /**
   * Function to retrieve list of doctors
   */

  return (
    <div>
        <title>BITU3973 | Admin User Activity Log</title>
        <AdminLayout adminID={adminID} adminName={adminName} active={"User Activity"}>
          
          {/** Row 1 */}
          <div class="w-full px-6 pt-3 h-fit overflow-hidden">
            <h1 class="text-xl"><b>User Activity Log</b></h1>
          </div>

          {/** Row 2 */}
          <div class="w-full px-5 h-fit overflow-hidden">
            
            <h1 class=" text-lg px-1 py-2"><b>Patient</b></h1>
            
            <div class="relative overflow-x-auto h-56 overflow-y-auto shadow-md sm:rounded-lg">
                
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
                        {/* Map through the doctors array and render each doctor */}
                        {/* {patients.map((patient, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{patient.PatientName}</td>
                            <td className="px-6 py-4">{new Date(patient.LastLoginDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(patient.LastUpdateDateTime).toLocaleString()}</td>    
                            <td className="px-6 py-4">
                            <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        ))} */}
                        {filteredPatients.map((patient, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{patient.PatientName}</td>
                            <td className="px-6 py-4">{new Date(patient.LastLoginDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(patient.LastUpdateDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">
                            <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    
                </table>

            </div>

          </div>

          <hr className='border-black border-solid border-t-4 mt-3 mx-5'/>

          {/** Row 2 */}
          <div class="w-full px-5 pt-3 h-fit overflow-hidden">
            
            <h1 class="text-lg px-1 py-2"><b>Doctor</b></h1>
            
            <div class="relative overflow-x-auto h-56 overflow-y-auto shadow-md sm:rounded-lg">
                
                <div class="p-4 bg-gradient-to-r from-purple-dark to-red-deep">
                    <label label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search" value={searchDoctorQuery} onChange={(e) => setSearchDoctorQuery(e.target.value)} class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search doctors" />
                    </div>
                </div>

                <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            
                            <th scope="col" class="px-6 py-3">
                                Doctor
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
                        {/* Map through the doctors array and render each doctor */}
                        {/* {doctors.map((doctor, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{doctor.DoctorName}</td>
                            <td className="px-6 py-4">{new Date(doctor.LastLoginDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(doctor.LastUpdateDateTime).toLocaleString()}</td>    
                            <td className="px-6 py-4">
                            <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        ))} */}
                        {filteredDoctors.map((doctor, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{doctor.DoctorName}</td>
                            <td className="px-6 py-4">{new Date(doctor.LastLoginDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">{new Date(doctor.LastUpdateDateTime).toLocaleString()}</td>
                            <td className="px-6 py-4">
                            <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            
          </div>
        </AdminLayout>
        
    </div>
  )
}

export default AdminControlUser;

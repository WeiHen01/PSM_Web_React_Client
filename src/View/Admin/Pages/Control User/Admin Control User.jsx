import React, {useEffect ,useState} from 'react'
import AdminLayout from '../../Components/AdminLayout';
import { useLocation } from 'react-router-dom';
import { FaUser, FaBell, FaEdit } from 'react-icons/fa';
import { User, Stethoscope, User2Icon, Bell } from "lucide-react";

import axios from 'axios';
import {
  CardHeader, CardBody,
  Typography, Button
} from "@material-tailwind/react";
import Chart from "react-apexcharts";




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

  

  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchTotalRecords();
  }, []);

  const fetchTotalRecords = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/patient/totalRecords`);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      setError('Error fetching total records');
    }
  };

  const [totalDoctorRecords, setTotalDoctorRecords] = useState(0);
  useEffect(() => {
    fetchTotalDoctorRecords();
  }, []);

  const fetchTotalDoctorRecords = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/doctor/totalRecords`);
      setTotalDoctorRecords(response.data.totalRecords);
    } catch (error) {
      setError('Error fetching total records');
    }
  };

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatientProfileModel, setProfileView] = useState(false);
  const openPatientProfile = (patient) => {
    setSelectedPatient(patient);
    setProfileView(true);
  };

  const closePatientProfile = () => {
    setSelectedPatient(null);
    setProfileView(false);
  };

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewDoctorProfileModel, setDoctorProfileView] = useState(false);
  const openDoctorProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorProfileView(true);
  };

  const closeDoctorProfile = () => {
    setSelectedDoctor(null);
    setDoctorProfileView(false);
  };



  /**
   * Toggle Update Modal
   */
  const [viewSendNotification, setSendNotificationView] = useState(false);
  const openSendNotification = () => {
    setSendNotificationView(!viewSendNotification);
  };

  /**
   * Send Notification via OneSignal
   */
  const sendNotification = async (title, message, users) => {
    const _appId = 'ae3fc8cd-0f1e-4568-a8cc-7172abe05ae3';
    const _apiKey = 'MGMwYzdmZTAtMjYwMC00YzhlLTgzYjUtNDdkMmRjNjU3NTMy';
    try {
      // Send a notification using OneSignal API
      const response = await axios.post('https://onesignal.com/api/v1/notifications', {
        app_id: _appId,
        include_external_user_ids: [users],
        contents: { en: message },
        headings: { en: title },
        // Additional notification options can be added here
      }, {
        headers: {
          'Authorization': `Basic ${_apiKey}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
      console.log(response);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  
  const chartConfig = {
    type: "donut",
    width: 380,
    height: 380,
    series: [
      totalRecords, totalDoctorRecords
    ],
    options: {
      labels: ['Patient', 'Doctor'],
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions:{
        pie:{
          donut:{
            size: "25px",
            labels:{
                show:true,
                total:{
                    show:true,
                    showAlways:true,
                    //formatter: () => '343',
                    fontSize: 15,
                    fontFamily: 'inherit',
                    color: '#f90000',
                }
            }
          }
        }

      },

      fill: {
        type: 'gradient',
      },
      colors: ["#1e88e5", "#d81b60"],
      legend: {
        show: true,
        
      },
      
    },
  };


  const [inactivePatients, setInactivePatients] = useState([]);
  const [inactiveDoctors, setInactiveDoctors] = useState([]);
  const [combinedInactiveList, setCombinedInactiveList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInactiveList, setFilteredInactiveList] = useState([]);
  
  const fetchInactivePatients = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/patient/find/inactivePatient`);
      setInactivePatients(response.data);
    } catch (error) {
      console.error('Error fetching inactive patients:', error);
    }
  };

  const fetchInactiveDoctors = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/doctor/find/inactiveDoctor`);
      setInactiveDoctors(response.data);
    } catch (error) {
      console.error('Error fetching inactive doctors:', error);
    }
  };

  useEffect(() => {
    fetchInactivePatients();
    fetchInactiveDoctors();
  }, []);

  useEffect(() => {
    setCombinedInactiveList([...inactivePatients, ...inactiveDoctors]);
  }, [inactivePatients, inactiveDoctors]);

  useEffect(() => {
    setFilteredInactiveList(
      combinedInactiveList.filter(user => 
        (user.PatientName || user.DoctorName).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, combinedInactiveList]);

  return (
    <div>
        <title>BITU3973 | Admin User Activity Log</title>
        <AdminLayout adminID={adminID} adminName={adminName} active={"User Activity"}>
          
          {/** Row 1 */}
          <div class="w-full px-6 pt-3 pb-3 h-fit overflow-hidden">
            <h1 class="text-xl"><b>User Activity Log</b></h1>
          </div>

          {/** Update Profile Modal */}
          {viewSendNotification && (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-1/2 max-w-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                      >
                        <div className="w-max rounded-lg bg-gradient-to-r from-purple-dark to-red-deep p-5 text-white">
                          <Bell className="h-6 w-6" />
                        </div>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            Send Notification
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                          >
                            Email
                          </Typography>
                        </div>
                        <div>
                          
                        </div>
                      </CardHeader>
                    <button
                      onClick={openSendNotification}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4">
                    
                    <h3 className="text-xl font-semibold text-gray-900">
                      Would you like to notify this user?
                    </h3>
                    
                    

                    <div className="flex justify-center mt-4">
                      <Button onClick={()=>sendNotification("Are you still okay?", "We notice you have long time not login", "P-1")}>Notify user</Button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/** Update Profile Modal */}
          {viewPatientProfileModel && selectedPatient &&  (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-6/12 max-h-[80%] overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                      >
                        <div className="w-max rounded-lg bg-gradient-to-r from-purple-dark to-red-deep p-5 text-white">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            {selectedPatient.PatientName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                          >
                            {selectedPatient.PatientEmail}
                          </Typography>
                        </div>
                        <div>
                        
                        </div>
                      </CardHeader>
                    <button
                      onClick={closePatientProfile}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Gender: {selectedPatient.PatientGender}
                    </label>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Address: {selectedPatient.PatientAddress}
                    </label>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Contact: {selectedPatient.PatientContact}
                    </label>
                    
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewDoctorProfileModel && selectedDoctor &&  (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-6/12 max-h-[80%] overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                      >
                        <div className="w-max rounded-lg bg-gradient-to-r from-purple-dark to-red-deep p-5 text-white">
                          <Stethoscope className="h-6 w-6" />
                        </div>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            {selectedDoctor.DoctorName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                          >
                            {selectedDoctor.DoctorEmail}
                          </Typography>
                        </div>
                        <div>
                        
                        </div>
                      </CardHeader>
                    <button
                      onClick={closeDoctorProfile}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Contact: {selectedDoctor.DoctorContact}
                    </label>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Specialize: {selectedDoctor.DoctorSpecialize}
                    </label>
                    
                    

                  </div>
                </div>
              </div>
            </div>
          )}
      

          {/* <!-- cards --> */}
          <div class="w-full px-5 py-5 mx-auto h-fit overflow-hidden items-stretch ">
            {/* <!-- row 1 --> */}
              <div class="flex flex-wrap px-3 -mx-2 gap-4">
                
                <div className="claymorphism-card flex items-center justify-between w-64 hover:cursor-pointer" >
                  <div>
                    <div className="claymorphism-card-header">
                      
                      <p className='font-semibold text-2xl'>{error ? error : `${totalRecords !== null ? totalRecords : 'Loading...'}`}</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">Patients registered</p>
                    </div>
                  </div>
                  <User size={50}/>
                </div>

                <div className="claymorphism-card flex items-center justify-between w-64  hover:cursor-pointer">
                  <div>
                    <div className="claymorphism-card-header">
                      <p className='font-semibold text-2xl'>{totalDoctorRecords}</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">Doctors registered</p>
                    </div>
                  </div>
                  <Stethoscope size={50}/>
                </div>

                <div className="claymorphism-card flex items-center justify-between w-64 hover:cursor-pointer">
                  <div>
                    <div className="claymorphism-card-header">
                    <p className='font-semibold text-2xl'>{totalRecords + totalDoctorRecords}</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">of patients and doctors</p>
                    </div>
                  </div>
                  <User2Icon size={50}/>
                </div>

              </div>

              <div class="px-3 -mx-2 gap-4 flex">
                
                <div>
                    <h1 class=" text-lg px-1 py-2"><b>Patient</b></h1>
                    <div class="relative overflow-x-auto h-48 overflow-y-auto shadow-md sm:rounded-lg">
                          <div class="p-4 flex bg-gradient-to-r from-purple-dark to-red-deep">
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
                                      <td className="px-6 py-4 flex">
                                          <FaUser size={30} onClick={() => openPatientProfile(patient)}   className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                          <FaEdit size={30} onClick={null}   className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                      </td>
                                  </tr>
                                  ))}
                              </tbody>
                              
                          </table>
                      </div>



                      <h1 class=" text-lg px-1 py-2"><b>Doctor</b></h1>
                      <div class="relative overflow-x-auto h-48 overflow-y-auto shadow-md sm:rounded-lg">
                        <div class="p-4 flex bg-gradient-to-r from-purple-dark to-red-deep">
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
                                
                                {filteredDoctors.map((doctor, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <p className="font-bold">{doctor.DoctorName}</p>
                                        <p>{doctor.DoctorEmail}</p>
                                    </td>
                                    <td className="px-6 py-4">{calculateTimeDifference(doctor.LastLoginDateTime)}</td>
                                    <td className="px-6 py-4">{calculateTimeDifference(doctor.LastUpdateDateTime)}</td>
                                    <td className="px-6 py-4 text-center flex">
                                        <Stethoscope size={30} onClick={() => openDoctorProfile(doctor)}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                        <FaEdit size={30} onClick={null}   className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                </div>


                <div>

                <h1 class=" text-lg px-1 py-2"><b>Inactive users</b></h1>
                    <div class="relative overflow-x-auto h-56 overflow-y-auto shadow-md sm:rounded-lg">
                        <div class="p-4 bg-gradient-to-r from-purple-dark to-red-deep">
                            <label label for="table-search" class="sr-only">Search</label>
                            <div class="relative mt-1">
                                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="table-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search users" />
                            </div>

                        </div>

                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Last Login
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            {filteredInactiveList.map((user, index) => (
                              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <p className="font-bold">{user.PatientName || user.DoctorName}</p>
                                  <p>{user.PatientEmail || user.DoctorEmail}</p>
                                </td>
                                <td className="px-6 py-4">{calculateTimeDifference(user.LastLoginDateTime)}</td>
                                <td className="px-6 py-4 text-center">
                                    <FaBell size={30} onClick={openSendNotification}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                </td>
                              </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>


                    <h1 class=" text-lg px-1 py-2"><b>Statistics</b></h1>
                    <div class="relative overflow-x-auto h-56 overflow-y-auto shadow-md sm:rounded-lg">
                      <CardBody className="mt-4 grid place-items-center px-2">
                        <Chart {...chartConfig} />
                      </CardBody>

                    </div>

                </div>


                




              </div>

             

          </div>
        

          
        </AdminLayout>
        
    </div>
  )
}

export default AdminControlUser;

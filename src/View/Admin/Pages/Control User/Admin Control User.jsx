import React, {useEffect ,useState} from 'react'
import AdminLayout from '../../Components/AdminLayout';
import { useLocation } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import { User, Stethoscope, Users2Icon, User2Icon } from "lucide-react";

import axios from 'axios';


import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";


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

  /**
   * Toggle Update Modal
   */
  const [viewGraphModal, setViewGraphOpen] = useState(false);
  const openGraph = () => {
    setViewGraphOpen(!viewGraphModal);
  };

  const [viewDoctorGraphModal, setViewDoctorGraphOpen] = useState(false);
  const openDoctorGraph = () => {
    setViewDoctorGraphOpen(!viewDoctorGraphModal);
  };

  

const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Male",
      data: [40, 300, 320, 50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
    {
      name: "Female",
      data: [40, 300, 320, 500, 350, 200, 230, 300, 320, 50, 40,  500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: true,
    },
    dataLabels: {
      enabled: false,
      fontFamily: "inherit",
    },
    colors: ["#000dff", "#C10214"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

const pulseConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Pulse",
      data: [40, 300, 320, 50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
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
    colors: ["#C10214"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};


  /**
   * Function to retrieve list of doctors
   */

  return (
    <div>
        <title>BITU3973 | Admin User Activity Log</title>
        <AdminLayout adminID={adminID} adminName={adminName} active={"User Activity"}>
          
          {/** Row 1 */}
          <div class="w-full px-6 pt-3 pb-3 h-fit overflow-hidden">
            <h1 class="text-xl"><b>User Activity Log</b></h1>
          </div>

          {/** Update Profile Modal */}
          {viewGraphModal && (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-full max-w-full">
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
                        Patients Registered
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                      >
                        Numbers of patients registered recently
                      </Typography>
                    </div>
                  </CardHeader>
                    <button
                      onClick={openGraph}
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
                    {/** Modal content */}
                      <Card>
                        
                        <CardBody className="px-2 pb-0">
                          <Chart {...chartConfig} />
                        </CardBody>
                      </Card>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/** Update Profile Modal */}
          {viewDoctorGraphModal && (
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
              <div className="relative p-4 w-full max-w-full">
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
                        Doctors Registered
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                      >
                        Numbers of doctors registered recently
                      </Typography>
                    </div>
                  </CardHeader>
                    <button
                      onClick={openDoctorGraph}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
                    {/** Modal content */}
                    <Card>
                      
                      <CardBody className="px-2 pb-0">
                        <Chart {...chartConfig} />
                      </CardBody>
                    </Card>

                  </div>
                </div>
              </div>
            </div>
          )}

          
          {/* <!-- cards --> */}
          <div class="w-full px-5 py-5 mx-auto h-fit overflow-hidden items-stretch ">
            {/* <!-- row 1 --> */}
              <div class="flex flex-wrap px-3 -mx-2 gap-4">
                
                <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick={openGraph}>
                  <div>
                    <div className="claymorphism-card-header">
                      <p className="font-semibold">Numbers</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">Patients registered today</p>
                    </div>
                  </div>
                  <User size={50}/>
                </div>

                <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick={openDoctorGraph}>
                  <div>
                    <div className="claymorphism-card-header">
                      <p className="font-semibold">Numbers</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">Doctors registered today</p>
                    </div>
                  </div>
                  <Stethoscope size={50}/>
                </div>

                <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick={null}>
                  <div>
                    <div className="claymorphism-card-header">
                      <p className="font-semibold">Numbers</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">Inactive users for 7 days and above</p>
                    </div>
                  </div>
                  <Users2Icon size={50}/>
                </div>

                <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick={null}>
                  <div>
                    <div className="claymorphism-card-header">
                      <p className="font-semibold">Total Number</p>
                    </div>
                    <div className="claymorphism-card-content">
                      <p className="text-sm">of patients and doctors</p>
                    </div>
                  </div>
                  <User2Icon size={50}/>
                </div>

              </div>

              <div class="flex flex-wrap px-3 -mx-2 gap-4">
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
                            <h1 class="text-white p-3">Total Patients: </h1>
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
                                        View Account
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
                                        <FaUser size={30} onClick={null}   className='p-2  hover:bg-slate-500 hover:rounded-md' />
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
                            <h1 class="text-white p-3">Total Doctors: </h1>
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
                                        View account
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
                                    <td className="px-6 py-4 text-center">
                                        <FaUser size={30} onClick={null}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                    

                      

                  </div>
                  
                  <div>
                    <h1 class=" text-lg px-1 py-2"><b>Inactive users</b></h1>
                    <div class="relative overflow-x-auto h-96 overflow-y-auto shadow-md sm:rounded-lg">
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

                            <h1 class="text-white pt-3">Total Users: </h1>
                        </div>

                        <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Doctor
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
                                        <p>{calculateTimeDifference(doctor.LastLoginDateTime)}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <FaBell size={30} onClick={null}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                  </div>


                  

                  

              </div>

              <div class="flex flex-wrap px-3 -mx-2 gap-4">
                  
              </div>

             

          </div>
        

          
        </AdminLayout>
        
    </div>
  )
}

export default AdminControlUser;

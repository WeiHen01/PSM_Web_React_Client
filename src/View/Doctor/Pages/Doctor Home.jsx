import React, {useEffect ,useState}  from 'react';
import DoctorLayout from '../Components/DoctorLayout';
import { Thermometer, HeartPulse, User, UserSquare, Users2 } from "lucide-react";
import { useLocation } from 'react-router-dom';

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

const tempConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Temperature",
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
    colors: ["#020617"],
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



const avgConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Temperature",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
    {
      name: "Pulse",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
    colors: ["#ff6f00", "#ff006a"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
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

  /**
   * Toggle Update Modal
   */
  const [viewNewPatientsModal, setViewPatientGraph] = useState(false);
  const openViewPatientsGraph = () => {
    setViewPatientGraph(!viewNewPatientsModal);
  };

  /**
   * Toggle Update Modal
   */
  const [viewTempModel, setViewTempGraph] = useState(false);
  const openViewTemp = () => {
    setViewTempGraph(!viewTempModel);
  };

  /**
   * Toggle Update Modal
   */
  const [viewPulseModel, setViewPulseGraph] = useState(false);
  const openViewPulse = () => {
    setViewPulseGraph(!viewPulseModel);
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

      {/** Update Profile Modal */}
      {viewNewPatientsModal && (
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
                        Numbers of patients registered
                      </Typography>
                    </div>
                  </CardHeader>
                <button
                  onClick={openViewPatientsGraph}
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
      {viewTempModel && (
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
                      <Thermometer className="h-6 w-6" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        Temperature
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                      >
                        Highest record of temperature recorded by patients
                      </Typography>
                    </div>
                    <div>
                      <Menu>
                        <MenuHandler>
                          <Button>View by Year</Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>Menu Item 1</MenuItem>
                          <MenuItem>Menu Item 2</MenuItem>
                          <MenuItem>Menu Item 3</MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </CardHeader>
                <button
                  onClick={openViewTemp}
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
                    <Chart {...tempConfig} />
                  </CardBody>
                </Card>

              </div>
            </div>
          </div>
        </div>
      )}


      {/** Update Profile Modal */}
      {viewPulseModel && (
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
                      <HeartPulse className="h-6 w-6" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        Pulse
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                      >
                        Highest record of pulse recorded by patients
                      </Typography>
                    </div>
                    <div>
                      <Menu>
                        <MenuHandler>
                          <Button>View by Year</Button>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>Menu Item 1</MenuItem>
                          <MenuItem>Menu Item 2</MenuItem>
                          <MenuItem>Menu Item 3</MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </CardHeader>
                <button
                  onClick={openViewPulse}
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
                    <Chart {...pulseConfig} />
                  </CardBody>
                </Card>

              </div>
            </div>
          </div>
        </div>
      )}

      


      {/* <!-- cards --> */}
      <div class="w-full px-5 py-6 mx-auto h-fit overflow-hidden items-stretch ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-4">
          <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick = {openViewTemp}>
            <div>
              <div className="claymorphism-card-header">
                <p className="font-semibold">Highest Record Today</p>
              </div>
              <div className="claymorphism-card-content">
                <p className="text-sm">Temperature (°C) Today</p>
              </div>
            </div>
            <Thermometer size={50}/>
          </div>

          <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick = {openViewPulse}>
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold'>Highest Record Today</p>
              </div>
              <div className="claymorphism-card-content">
              <p className="text-sm">Pulse (bpm) Today</p>
              </div>
            </div>
            <HeartPulse size={50} />

          </div>

          <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick = {openViewPatientsGraph}>
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold'>Numbers</p>
              </div>
              <div className="claymorphism-card-content">
              <p className="text-sm">New Patients Today</p>
              </div>
            </div>
            <User size={50} />

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
            <Users2 size={50} />

          </div>

         
          
        </div>


        


      </div>


      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Patients List</b></h1>
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
                                <UserSquare size={40}  className='p-2  hover:bg-slate-500 hover:rounded-md' />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    
                </table>
    
            </div>
    
    
            <div class= "relative overflow-x-auto h-80 w-1/4 overflow-y-auto shadow-md sm:rounded-lg">
                    
                <div class="p-4 bg-gradient-to-r from-purple-dark to-red-deep">
                    
                    <div class="relative mt-1">
                      <b className='text-white'>Recent Patient Average Record</b>
                    </div>
              
                </div>

                {/** Modal content */}
                <Card className=" bg-gray-200">
                  
                  <CardBody className="px-2 pb-0">
                    <Chart {...avgConfig} />
                  </CardBody>
                </Card>
    
                
    
            </div>
        </div>
        


      </div>
      
      </DoctorLayout>
    </div>
    
  );
}

export default DoctorHome;
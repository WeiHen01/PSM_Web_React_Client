import React, {useEffect ,useState}  from 'react';
import DoctorLayout from '../Components/DoctorLayout';
import { Thermometer, HeartPulse, UserSquare, Users2 } from "lucide-react";
import { useLocation } from 'react-router-dom';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import moment from 'moment';

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
// import Times New Roman font

import { Button } from "@material-tailwind/react";

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

  const [highestTemp, setHighestTemp] = useState(null);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);

  const [patientTempInfo, setPatientTempInfo] = useState(null);
  const [patientPulseInfo, setPatientPulseInfo] = useState(null);

  useEffect(() => {
    const fetchHighestTemp = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/temp/highestToday`);
        if (response.data['Highest Temperature Today']) {
          setHighestTemp(response.data['Highest Temperature Today'].Temperature);

          const id = response.data['Highest Temperature Today'].PatientID;
          const patient = id.split("-");
          const patientID = patient[1];
          const type = "Temperature";

          getPatientInfo(patientID, type);

        } else {
          setError(response.data.msg || 'No data available');
        }
      } catch (err) {
        setError('No  temp');
      }
    };

    fetchHighestTemp();
  }, []);

  const [highestPulse, setHighestPulse] = useState(null);

  useEffect(() => {
    const fetchHighestPulse = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:8000/api/pulse/highestToday`);
        if (response.data['Highest Pulse Today']) {
          setHighestPulse(response.data['Highest Pulse Today'].PulseRate);
          const id = response.data['Highest Pulse Today'].PatientID;
          const patient = id.split("-");
          const patientID = patient[1];
          console.log("Patient Split: " + patientID);
          const type = "Pulse";

          getPatientInfo(patientID, type);

        } else {
          setError1(response.data.msg || 'No data available');
        }
      } catch (err) {
        setError1('No Pulse');
      }
    };

    fetchHighestPulse();
  }, []);



  const getPatientInfo = async (patientID, type) => {
      
    try {
      const response = await fetch(`http://${window.location.hostname}:8000/api/patient/findPatient/${patientID}`);
      
      if (!response.ok) {
        throw new Error('Error retrieving patient information');
      }
      const data = await response.json();

      if(type === "Temperature"){
        setPatientTempInfo(data);
      }

      if(type === "Pulse"){
        setPatientPulseInfo(data);
      }

    } catch (error) {
      console.error('Error fetching doctor info:', error);
      // Handle error state or display error message to the user
    }
  };


  const [highestRecords, setHighestRecords] = useState([]);

  useEffect(() => {
    fetchTempHighestRecords();
  }, []);

  const fetchTempHighestRecords = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/temp/highestRecords`);
      const sortedRecords = response.data.highestRecords.sort((a, b) => {
        // Sorting by date in ascending order
        return new Date(a.MeasureDate) - new Date(b.MeasureDate);
      });
      setHighestRecords(sortedRecords);
    } catch (error) {
      console.error('Error fetching highest records:', error);
    }
  };

  const [highestPulseRecords, setHighestPulseRecords] = useState([]);

  useEffect(() => {
    fetchPulseHighestRecords();
  }, []);

  const fetchPulseHighestRecords = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/pulse/highestRecords`);
      const sortedRecords = response.data.highestRecords.sort((a, b) => {
        // Sorting by date in ascending order
        return new Date(a.MeasureDate) - new Date(b.MeasureDate);
      });
      setHighestPulseRecords(sortedRecords);
    } catch (error) {
      console.error('Error fetching highest records:', error);
    }
  };

  const [avgTempData, setAvgTempData] = useState([]);
  const [avgPulseData, setAvgPulseData] = useState([]);

  useEffect(() => {
    fetchAverageRecent5Days();
  }, []);

  const fetchAverageRecent5Days = async () => {
    try {
      const tempResponse = await axios.get(`http://${window.location.hostname}:8000/api/temp/averageRecent5Days`);
      const pulseResponse = await axios.get(`http://${window.location.hostname}:8000/api/pulse/averageRecent5Days`);
      
      const tempAvgRecords = tempResponse.data['Average Temperature Recent 5 Days'];
      const pulseAvgRecords = pulseResponse.data['Average Pulse Rate Recent 5 Days'];

      const tempData = tempAvgRecords.map(record => ({
        x: record._id,
        y: record.avgTemp
      }));

      const pulseData = pulseAvgRecords.map(record => ({
        x: record._id,
        y: record.avgPulse
      }));

      setAvgTempData(tempData);
      setAvgPulseData(pulseData);
    } catch (error) {
      console.error('Error fetching average records:', error);
    }
  };

  const avgConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Temperature (°C)",
        data: avgTempData,
      },
      {
        name: "Pulse (BPM)",
        data: avgPulseData,
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
        },// Adjust categories as needed
        categories: avgTempData.map(record => record.x),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
          formatter: function(value) {
            return value.toFixed(2); // Set to 2 decimal points
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
        data: highestPulseRecords.map(record => record.highestPulse),
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
        categories: highestPulseRecords.map(record => record.date),
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
        data: highestRecords.map(record => record.highestTemp),
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
        categories: highestRecords.map(record => record.date),
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




  const [totalRecords, setTotalRecords] = useState(0);

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

  /**
   * Toggle Update Modal
   */
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatientProfileModel, setProfileView] = useState(false);
  const [pulseRecords, setPulseRecords] = useState([]);
  const [temperatureRecords, setTemperatureRecords] = useState([]);

  const openPatientProfile = (patient) => {
    setSelectedPatient(patient);
    fetchRecords(patient.PatientID);
    setProfileView(true);
  };

  const closePatientProfile = () => {
    setSelectedPatient(null);
    setPulseRecords([]);
    
    setTemperatureRecords([]);
    setProfileView(false);
  };
   
  // Function to fetch pulse and temperature records for a patient
  const fetchRecords = async (patientId) => {
    try {
      const [pulseResponse, temperatureResponse] = await Promise.all([
        fetch(`http://${window.location.hostname}:8000/api/pulse/records/P-${patientId}`),
        fetch(`http://${window.location.hostname}:8000/api/temp/records/P-${patientId}`)
      ]);

      if (!pulseResponse.ok) {
        throw new Error('Failed to fetch pulse records');
      }
      const pulseData = await pulseResponse.json();
      setPulseRecords(pulseData['Pulse Records']);

      if (!temperatureResponse.ok) {
        throw new Error('Failed to fetch temperature records');
      }
      const temperatureData = await temperatureResponse.json();
      setTemperatureRecords(temperatureData['Temperature Records']);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch pulse and temperature records when selectedPatient changes
    if (selectedPatient) {
      fetchRecords(selectedPatient._id);
    }
  }, [selectedPatient]);
 
  // helper function to convert hex code to RGB array
  function hexToRgb(hex) {
    const hexString = hex.replace(/^#/, '');
    const r = parseInt(hexString.substring(0, 2), 16);
    const g = parseInt(hexString.substring(2, 4), 16);
    const b = parseInt(hexString.substring(4, 6), 16);
    return [r, g, b];
  }

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add patient's name and email to the document
    doc.text("Patient Name: " + selectedPatient.PatientName, 14, 20);
    doc.text("Patient Email: "+ selectedPatient.PatientEmail, 14, 30);
  
    // Set font and font size for the document
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
  
    // Add a line break
    doc.text(" ", 14, 40);
  
    // Add a header for Pulse Records
    doc.text("Records in Pulse:", 14, 50);
  
    // Define columns for the auto table
    const columns = ["Date", "Pulse"];
  
    // Define data for the auto table
    const pulseData = pulseRecords.map(record => [moment(record.MeasureDate).format('DD/MM/YYYY, h:mm:ss A'), record.PulseRate]);

    const hexCode = '#0000ce'; // red
    const rgb = hexToRgb(hexCode);
  
    // Add the auto table to the document
    doc.autoTable({
      head: [columns],
      body: pulseData,
      startY: 60,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 2,
        overflow: 'linebreak',
        columnWidth: 'auto',
        fontFamily: 'Poppins'
      },
      headStyles: {
        fillColor: rgb, // white background
        textColor: [255, 255, 255], // black text
        fontStyle: 'bold',
        fontFamily: 'Poppins'
      },
      columnStyles: {
        0: { cellWidth: 100},
        1: { cellWidth: 80 }
      }
    });
  
    // Add a new page for Temperature Records
    doc.addPage();
    doc.text("Records in Temperature:", 14, 20);
  
    // Define columns for the auto table
    const tempColumns = ["Date", "Temperature"];
  
    // Define data for the auto table
    const tempData = temperatureRecords.map(record => [moment(record.MeasureDate).format('DD/MM/YYYY, h:mm:ss A'), record.Temperature]);
  
    // Add the auto table to the document
    doc.autoTable({
      head: [tempColumns],
      body: tempData,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 2,
        overflow: 'linebreak',
        columnWidth: 'auto',
        fontFamily: 'Poppins'
      },
      headStyles: {
        fillColor: rgb, // white background
        textColor: [255, 255, 255], // black text
        fontStyle: 'bold',
        fontFamily: 'Poppins'
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 80 }
      }
    });
  
    // Save the PDF document
    doc.save(selectedPatient.PatientName + ".pdf");
  };
  
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <DoctorLayout doctorID={doctorID} active = {'Home'}>
      
      <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Dashboard</b></h1>
      </div>

      {/** Update Profile Modal */}
      {viewPatientProfileModel && selectedPatient &&  (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-8/12 max-h-[80%] overflow-y-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
              <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                  >
                    <div className="w-max rounded-lg bg-gradient-to-r from-purple-dark to-red-deep p-5 text-white">
                      <UserSquare className="h-6 w-6" />
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

                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">
                  Pulse
                </label>
                
                {/* Apply overflow-y:auto to make the table scrollable */}
                <table className="w-full rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-auto">
                    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Pulse
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        
                    {/* Render pulse records */}
                    {pulseRecords.map((record, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          {calculateTimeDifference(record.MeasureDate)}
                        </td>
                        <td className="px-6 py-4">{record.PulseRate}</td>
                      </tr>
                    ))}

                    
                    </tbody>
                    
                </table>


                <div class="py-3"></div>

                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">
                  Temperature
                </label>

                {/* Apply overflow-y:auto to make the table scrollable */}
                <table className="w-full rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-auto">
                    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Temperature
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        
                    {/* Render pulse records */}
                    {temperatureRecords.map((record, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                          {calculateTimeDifference(record.MeasureDate)}
                        </td>
                        <td className="px-6 py-4">{record.Temperature}</td>
                      </tr>
                    ))}

                    
                    </tbody>
                    
                </table>



                 {/* Wrap the Button in a div for spacing and alignment */}
                  <div className="flex justify-end mt-4">
                    <Button onClick={generatePDF}>Print</Button>
                  </div>

                

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
                <p className="font-semibold text-2xl">
                  {error ? error : `${highestTemp !== null ? highestTemp : 'Loading...'}`}
                </p>
                <p className="text-sm">Patient: <b>{ `${patientTempInfo != null ? patientTempInfo.PatientName :'Loading....'}`}</b></p>
              </div>
              <div className="claymorphism-card-content">

                <p className="text-sm">Highest Temperature (°C) Today</p>
              </div>
            </div>
            <Thermometer size={50}/>
          </div>

          <div className="claymorphism-card flex items-center justify-between w-72 hover:cursor-pointer" onClick = {openViewPulse}>
            <div>
              <div className="claymorphism-card-header">
                <p className="font-semibold text-2xl">
                  {error1 ? error1 : `${highestPulse !== null ? highestPulse : 'Loading...'}`}
                </p>
                <p className="text-sm">Patient: <b>{ `${patientPulseInfo != null ? patientPulseInfo.PatientName :'Loading....'}`}</b></p>
              </div>
              <div className="claymorphism-card-content">
              <p className="text-sm">Highest Pulse (BPM) Today</p>
              </div>
            </div>
            <HeartPulse size={50} />

          </div>

          

          <div className="claymorphism-card flex items-center justify-between w-72">
            <div>
              <div className="claymorphism-card-header">
                <p className='font-semibold text-2xl'>{totalRecords}</p>
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
                                <UserSquare size={40}  className='p-2  hover:bg-slate-500 hover:rounded-md' onClick={() => openPatientProfile(patient)}  />
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
import React, { useState, useEffect, useRef  } from 'react'
import DoctorLayout from '../../Components/DoctorLayout';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DoctorChat = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { doctorID } = state;

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patients, setAllPatients] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [patientInfo, setPatient] = useState([]);

  useEffect(() => {
    
    const getDoctorInfo = async () => {
      
      try {
        const response = await fetch(`http://${window.location.hostname}:8000/api/doctor/findDoctor/${doctorID}`);
        
        if (!response.ok) {
          throw new Error('Error retrieving doctor information');
        }
        const data = await response.json();
        setDoctorInfo(data);

      } catch (error) {
        console.error('Error fetching doctor info:', error);
        // Handle error state or display error message to the user
      }
    };

    const getAllPatients = async () => {
      
      try {
        const response = await fetch(`http://${window.location.hostname}:8000/api/patient`);
        
        if (!response.ok) {
          throw new Error('Error retrieving all patients information');
        }
        const data = await response.json();
        setAllPatients(data);

      } catch (error) {
        console.error('Error fetching all patients info:', error);
        // Handle error state or display error message to the user
      }
    };

    

    getDoctorInfo(); // Call the function when component mounts
    getAllPatients();
    
  }, [doctorID]);

  

  const handlePatientSelection = async (patientID) => {
      setSelected(patientID);
      console.log(patientID);
      if (!chatHistory[patientID]) {
        await fetchChatHistory(patientID);
      }
      getPatientInfo(patientID);

  }

  

  const getPatientInfo = async (patientID) => {
      
    try {
      const response = await fetch(`http://${window.location.hostname}:8000/api/patient/findPatient/${patientID}`);
      
      if (!response.ok) {
        throw new Error('Error retrieving doctor information');
      }
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error('Error fetching patient info:', error);
      // Handle error state or display error message to the user
    }
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

  
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      // Check if the message is not empty
      if (message.trim() === '') {
        return;
      }
  
      // Make a POST request to the backend API endpoint
      const response = await axios.post(`http://${window.location.hostname}:8000/api/chat/createChat`, {
        ChatMessage: message,
        PatientID: 'D-' + doctorID,
        ReceiverID: 'P-' + selectedPatient,
        ChatDateTime: new Date(),
        ChatMessageStatus: 'Unseen',
        // Add any other necessary fields here
      });
  
      // Check if the request was successful
      if (response.status === 200) {

        // Clear the message input field after sending the message
        setMessage('');
        
        // Update the chat history to include the sent message
        const newChat = {
          ChatMessage: message,
          PatientID: 'D-' + doctorID,
          ReceiverID: 'P-' + selectedPatient,
          ChatDateTime: new Date(),
          ChatMessageStatus: 'Unseen',
        };
  
        setChatHistory(prevState => ({
          ...prevState,
          [selectedPatient]: prevState[selectedPatient] ? [...prevState[selectedPatient], newChat] : [newChat],
        }));

        // After sending the message, update the chat history
        await fetchChatHistory(selectedPatient);
  
        // Scroll to the bottom of the chat container
        scrollToBottom();

        var users = "P-" + patientInfo.PatientID;

        console.log(doctorInfo.DoctorName + ", " + message + ", " + users);

        /**
         * Function call to send notification through OneSignal
         */
        sendNotification(doctorInfo.DoctorName, message, users);

      } else {
        // Handle error if the request was not successful
        console.error('Error sending message:', response.data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const [selectedPatient, setSelected] = useState(null);

  // Function to fetch chat history between the selected patient and the doctor
  const fetchChatHistory = async (patientID) => {
    var patient = "P-" + patientID;
    var doctor = "D-" + doctorID;
    try {
      const response = await axios.get(`http://${window.location.hostname}:8000/api/chat/findChatBetween/${patient}/${doctor}`);
      const data = response.data;

      setChatHistory(prevState => ({
        ...prevState,
        [patientID]: data 
      }));

    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Handle error state or display error message to the user
    }
  };

  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedPatient, chatHistory]);

  // Function to format message timestamp
  const formatMessageDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    const diffTime = Math.abs(today - messageDate);
    console.log("Different: " + diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays === 0) {
      // Message sent today
      const minutesAgo = Math.floor(diffTime / (1000 * 60));
      return `${minutesAgo} minutes ago`;
    }else if (diffDays === 0 && diffHours > 6 && diffHours < 24) {
      // Message sent yesterday
      return `${timestamp}`;
    }else if (diffDays === 0 && diffHours > 1 && diffHours < 6) {
      // Message sent yesterday
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      // Message sent yesterday
      return 'Yesterday';
    } else {
      // Message sent on a previous date
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <div className=' h-full'>
      
      <title>BITU3973 | Doctor Chat</title>
      <DoctorLayout doctorID={doctorID} active = {'Chat'}>
        
        <div className="h-fit px-6 py-3">
          
          <h1 class="text-xl"><b>Chat with Patient</b></h1>

          <div class="mt-4 w-92 h-[75vh] bg-red-50 flex flex-row">

            {/** Left-container */}
            <div className="left h-full w-[30%] flex flex-col bg-orange-200">
              
              
              {/** Scrollable */}
              {patients.map(patient => (
              <div className={`
                    p-3 bg-orange-200 min-h-max overflow-y-auto 
                    ${selectedPatient === patient.PatientID ?  ' bg-pink-500' : 'hover:bg-blue-600'}
                  `}
                   key={patient.PatientID} >
                
                  <div className='cursor-pointer' onClick={() => handlePatientSelection(patient.PatientID)}> 
                    <p className="font-bold text-lg">{patient.PatientName}</p>
                  </div>
                
              </div>
              ))}

              
              
              
            </div>

             {/** Right-container */}
            <div className="right h-full w-[70%] flex flex-col justify-between">
              
              <div className=" h-20 bg-gradient-to-r from-purple-dark to-red-deep text-white p-3">
                {patientInfo && (<p className="font-bold text-lg">{patientInfo.PatientName}</p>)}
              </div>

              {/** Chat contents with bubbles */}
              
              
              <div ref={chatContainerRef} className='h-full p-3 bg-orange-200 overflow-y-auto'>
              {selectedPatient && chatHistory[selectedPatient] ? ( 
                chatHistory[selectedPatient].length === 0 ? (
                  <div className="text-center text-gray-500">No chat history available</div>
                )
                : (
                  chatHistory[selectedPatient].map(chat => (
                    <div 
                      key={chat.ChatID}
                      className={
                        chat.PatientID === `P-${patientInfo.PatientID}`
                          ? "text-left mb-4 p-2 mr-auto w-96 bg-[#ff8ab1] rounded-md hover:translate-x-6 duration-300"
                          : "text-left mb-4 p-2 ml-auto w-96 overflow-x-auto bg-white rounded-md hover:-translate-x-6 duration-300"
                      }
                      style={{wordWrap: 'break-word', maxWidth: '60ch'}}
                     
                      
                    >
                      {
                        chat.PatientID === `P-${patientInfo.PatientID}`
                        ? (
                          <p><strong>{patientInfo.PatientName}</strong></p>
                        )
                        : <p><strong>You</strong></p>
                      }
                      <p>{chat.ChatMessage}</p>
                      <p className="text-right">{formatMessageDate(chat.ChatDateTime)} {new Date(chat.ChatDateTime).toLocaleTimeString()}</p>
                    </div>
                  ))
                )
              ) : (
                <div className="text-center text-gray-500"></div>
              )}
              </div>
                
                
              



              {/** Input field for sending message */}

              <div style={{ position: 'relative' }} className =" h-16 flex bg-gradient-to-r from-purple-dark to-red-deep text-white p-3 mt-auto">
                
                  <FontAwesomeIcon
                    icon={faMessage}
                    style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
                  />

                  <input 
                    placeholder="Message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}  
                    className="w-full pl-14 pr-2 py-2 bg-gray-100 text-black" 
                    style={{ paddingLeft: '35px', width: '100%' }} 
                  />

                  {/* sEND BUTTON */}
                  <button
                    className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => {
                      // Handle button click
                      sendMessage()
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>


                

              </div>


            </div>

          </div>




        </div>

      </DoctorLayout>

    </div>
  )
}

export default DoctorChat;

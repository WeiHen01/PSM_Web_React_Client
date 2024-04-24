import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import HomePage from "./View/Home Page";

import Login from "./View/Login";
import Register from './View/Register';
import ForgetPassword from './View/Forget Password';
import ResetPassword from './View/Reset Password';

import DoctorApp from "./View/Doctor/DoctorApp";
import AdminApp from './View/Admin/AdminApp';

import runOneSignal from './OneSignal';

function App() {
  useEffect(() => {
    runOneSignal();
  })

  return (
    <div className="App">
    <Routes>
      <Route index path ="/" element={<HomePage />} />
      <Route index path ="/Login" element={<Login />} />
      <Route index path ="/Register" element={<Register />} />
      <Route index path ="/ForgetPassword" element={<ForgetPassword />} />
      <Route index path ="/ResetPassword" element={<ResetPassword />} />
      
      {/** Navigate to Doctor Level through DoctorApp.js */}
      <Route path = "/Doctor/*" element={<DoctorApp/>}/>

      {/** Navigate to Admin Level through AdminApp.js */}
      <Route path = "/Admin/*" element={<AdminApp />}/>
      
    </Routes>
        
    </div>
  );
}

export default App;

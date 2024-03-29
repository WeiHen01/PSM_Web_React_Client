import { Routes, Route } from 'react-router-dom';
import HomePage from "./View/Home Page";

import Login from "./View/Login";
import Register from './View/Register';
import ForgetPassword from './View/Forget Password';

import DoctorApp from "./View/Doctor/DoctorApp";
import AdminApp from './View/Admin/AdminApp';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route index path ="/" element={<HomePage />} />
      <Route index path ="/Login" element={<Login />} />
      <Route index path ="/Register" element={<Register />} />
      <Route index path ="/ForgetPassword" element={<ForgetPassword />} />
      
      {/** Navigate to Doctor Level through DoctorApp.js */}
      <Route path = "/Doctor/*" element={<DoctorApp/>}/>

      {/** Navigate to Doctor Level through DoctorApp.js */}
      <Route path = "/Admin/*" element={<AdminApp />}/>
      
    </Routes>
        
    </div>
  );
}

export default App;

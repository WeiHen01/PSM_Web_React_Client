import { Routes, Route } from 'react-router-dom';
import DoctorHome from './Pages/Doctor Home';
import DoctorChat from './Pages/Chat/DoctorChat';
import DoctorReport from './Pages/Report/Doctor Report';
import DoctorProfile from './Pages/Profile/Doctor Profile';

function DoctorApp() {
  return (
  <div className="DoctorApp">
    <Routes>
      <Route path ="/DoctorHome" element={<DoctorHome />} />
      <Route path ="/DoctorProfile" element={<DoctorProfile />} />
      <Route path ="/DoctorChat" element={<DoctorChat />} />
      <Route path ="/DoctorReport" element={<DoctorReport />} />
    </Routes>
        
  </div>
  );
}

export default DoctorApp;

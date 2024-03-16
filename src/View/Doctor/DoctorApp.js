import { Routes, Route } from 'react-router-dom';
import DoctorHome from './Home/Doctor Home';
import DoctorProfile from './Profile/Doctor Profile';
import DoctorChat from './Chat/DoctorChat';
import DoctorReport from './Report/Doctor Report';

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

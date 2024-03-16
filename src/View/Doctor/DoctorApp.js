import { Routes, Route } from 'react-router-dom';
import DoctorHome from './Home/Doctor Home';
import DoctorProfile from './Profile/Doctor Profile';
import DoctorChat from './Chat/DoctorChat';

function DoctorApp() {
  return (
    <div className="DoctorApp">
    <Routes>
      <Route path ="/DoctorHome" element={<DoctorHome />} />
      <Route path ="/DoctorProfile" element={<DoctorProfile />} />
      <Route path ="/DoctorChat" element={<DoctorChat />} />
    </Routes>
        
    </div>
  );
}

export default DoctorApp;

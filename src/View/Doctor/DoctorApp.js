import { Routes, Route } from 'react-router-dom';
import DoctorHome from './Doctor Home';
import DoctorProfile from './Profile/DoctorProfile';

function DoctorApp() {
  return (
    <div className="DoctorApp">
    <Routes>
      <Route path ="/DoctorHome" element={<DoctorHome />} />
      <Route path ="/DoctorProfile" element={<DoctorProfile />} />
    </Routes>
        
    </div>
  );
}

export default DoctorApp;

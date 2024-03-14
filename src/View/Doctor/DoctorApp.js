import { Routes, Route } from 'react-router-dom';
import DoctorHome from './Doctor Home';

function DoctorApp() {
  return (
    <div className="DoctorApp">
    <Routes>
      <Route path ="/DoctorHome" element={<DoctorHome />} />
    </Routes>
        
    </div>
  );
}

export default DoctorApp;

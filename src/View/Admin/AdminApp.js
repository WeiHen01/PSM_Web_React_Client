import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
function AdminApp() {
  return (
    <div className="AdminApp">
    <Routes>
      <Route path ="/AdminHome" element={<AdminHome />} />
    </Routes>
        
    </div>
  );
}

export default AdminApp;

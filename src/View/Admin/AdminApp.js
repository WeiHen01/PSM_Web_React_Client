import { Routes, Route } from 'react-router-dom';

import AdminControlUser from './Pages/Control User/Admin Control User';
import AdminProfile from './Pages/Profile/Admin Profile';
import AdminHome from './Pages/AdminHome';


function AdminApp() {
  return (
    <div className="AdminApp">
    <Routes>
      <Route path ="/AdminHome" element={<AdminHome />} />
      <Route path ="/AdminProfile" element={<AdminProfile />} />
      <Route path ="/AdminCtrlUser" element={<AdminControlUser />} />
    </Routes>
        
    </div>
  );
}

export default AdminApp;

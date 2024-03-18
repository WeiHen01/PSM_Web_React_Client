import { Routes, Route } from 'react-router-dom';
import AdminHome from './Pages/AdminHome';
import AdminControlUser from './Pages/Control User/Admin Control User';
function AdminApp() {
  return (
    <div className="AdminApp">
    <Routes>
      <Route path ="/AdminHome" element={<AdminHome />} />
      <Route path ="/AdminCtrlUser" element={<AdminControlUser />} />
    </Routes>
        
    </div>
  );
}

export default AdminApp;

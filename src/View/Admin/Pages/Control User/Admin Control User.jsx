import React from 'react'
import AdminLayout from '../../Components/AdminLayout';
import { useLocation } from 'react-router-dom';

const AdminControlUser = () => {
  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { adminID, adminName } = state;

  return (
    <div>
        <title>BITU3973 | Admin User Activity Log</title>
        <AdminLayout adminID={adminID} adminName={adminName}>
          <div class="w-full px-5 pt-3 h-fit overflow-hidden ">
            <h1 class="text-xl"><b>Dashboard</b></h1>
          </div>
        </AdminLayout>
    </div>
  )
}

export default AdminControlUser;

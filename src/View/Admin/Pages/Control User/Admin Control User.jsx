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
            User Activity
        </AdminLayout>
    </div>
  )
}

export default AdminControlUser;

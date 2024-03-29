import React from 'react'
import AdminLayout from '../Components/AdminLayout';
import { useLocation } from 'react-router-dom';

const AdminHome = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { adminID, adminName } = state;

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Admin Home</title>
      <AdminLayout adminID={adminID} adminName={adminName}>
        
      </AdminLayout>
    </div>
  )
}

export default AdminHome;

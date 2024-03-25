import React, {useState, useEffect} from 'react'
import AdminLayout from '../../Components/AdminLayout'
import '../../Admin Style.css';
import Logo from '../../../../images/Logo.png'
import {Edit} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminProfile = () => {

  // Use useParams to access URL parameters
  const { state } = useLocation();
  const { adminID, adminName } = state;

  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    
    const getAdminInfo = async () => {
      
      try {
        const response = await fetch(`http://localhost:8080/api/admin/findAdmin/${adminID}`);
        
        if (!response.ok) {
          throw new Error('Error retrieving doctor information');
        }
        const data = await response.json();
        setAdminInfo(data);

      } catch (error) {
        console.error('Error fetching doctor info:', error);
        // Handle error state or display error message to the user
      }
    };

    getAdminInfo(); // Call the function when component mounts

  }, []);


  return (
    <div className = "overflow-hidden" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <title>BITU3973 | Doctor Home</title>
      <AdminLayout adminID={adminID} adminName={adminName}>
      
      <div className="w-full px-5 pt-3 h-fit overflow-hidden ">
        <h1 class="text-xl"><b>Profile</b></h1>
      </div>
      {/* <!-- cards --> */}
      <div class="w-full px-5 py-4 mx-auto h-fit overflow-hidden ">
        
        {/* <!-- row 1 --> */}
        <div class="flex flex-wrap px-3 -mx-2 gap-3 justify-center">
          
          <div className = "claymorphism-card-03 w-full items-center gap-3">
            
            <div className = "flex justify-center w-full">
              <img src={Logo} alt="Profile" className="p-2 w-28 h-28 rounded-full  bg-white cursor-pointer" />
            </div>

            <p className = "text-center text-2xl"><strong>{adminName}</strong></p>
            <p className = "text-center text-md">Admin</p>

            <p className = "text-center text-sm mt-6">This is my introduction</p>
          
          </div>

          <div className="gap-2">
            
            <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
              <div className ="flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Personal Info</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

              <div className ="flex justify-between mr-10 text-black">
                
                <div>
                  <h1 className = "text-l">Full name</h1>
                  <p className = "font-semibold">{adminName}</p>
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  {adminInfo && (<p className = "font-semibold">{adminInfo.AdminEmail}</p>)}
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  {adminInfo && (<p className = "font-semibold">{adminInfo.AdminEmail}</p>)}
                </div>

              </div>

              <div className =" mt-7 flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Bio</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

            </div>

            <div className=" claymorphism-card-02 w-full items-center gap-3 text-black">
              <div className ="flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Account</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

              <div className ="flex justify-between mr-10 text-black">
                
                <div>
                  <h1 className = "text-l">Full name</h1>
                  <p className = "font-semibold">This is me</p>
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  <p className = "font-semibold">This is me</p>
                </div>

                <div style={{ borderLeft: '1px solid black', height: '50px' }}></div>

                <div>
                  <h1 className = "text-l">Email</h1>
                  <p className = "font-semibold">This is me</p>
                </div>

              </div>

              <div className =" mt-7 flex justify-between text-black items-center">
                <b><h1 className = "text-black text-2xl">Bio</h1></b>
                <button>
                  <Edit />
                </button>
              </div>

              <hr className="border-1 border-black my-2"></hr>

            </div>

          </div>

          

        </div>


        {/** <!-- row 2 --> */}
        <div class= "flex flex-wrap -mx-3 group justify-between">
          
          

        </div>


      </div>
      
      </AdminLayout>
    </div>
  )
}

export default AdminProfile

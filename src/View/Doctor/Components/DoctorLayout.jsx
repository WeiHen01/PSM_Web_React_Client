import React from "react";
import DoctorHeader from "./DoctorHeader";

const DoctorLayout = ({children}) => {
    return (
        <div>
            <DoctorHeader />
            {children}
        </div>
    );
   
}
// variable for  the pages to  be imported
export default DoctorLayout;
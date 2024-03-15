import React from "react";
import Header from "./Header";

const MainLayout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
   
}
// variable for  the pages to  be imported
export default MainLayout;
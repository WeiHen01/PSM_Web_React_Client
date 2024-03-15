import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
   
}
// variable for  the pages to  be imported
export default MainLayout;
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

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
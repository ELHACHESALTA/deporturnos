import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";

const LayoutPublic = () => {
    return (
        <div className="dark:bg-neutral-900 min-h-screen flex flex-col min-w-[500px]">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
        
    )
}

export default LayoutPublic;
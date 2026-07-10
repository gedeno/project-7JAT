import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Sidebar } from "../ui/Sidebar";

export const MainLayout = () => {
    <div>
        <Navbar/>
        <div>
            <Sidebar/>
            
        </div>
    </div>
}
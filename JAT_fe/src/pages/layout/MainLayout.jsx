import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Sidebar } from "../ui/Sidebar";

export const MainLayout = () => {
    const [sidebar , setsidebar] =useState(false)
    return(
        <div className="min-h-screen flex flex-col">
        <Navbar onMenuToggle={()=>setsidebar(!sidebar)} />
        <div className="flex flex-1">
            <Sidebar isOpen = {sidebar} onClose = {()=>setsidebar(false)}/>
            <main className="flex-1 p-4 lg:p-6 overflow-auto">
                <Outlet/>
            </main>
        </div>
    </div>
    )
}
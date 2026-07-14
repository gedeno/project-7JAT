import { NavLink } from "react-router-dom";
import {HiOutlineViewGrid , 
    HiOutlineBriefcase , 
    HiOutlineChatAlt2 ,
    HiOutlineUser ,
    HiOutlineCog ,
    HiOutlineShieldCheck , 
    HiOutlineDocument } from 'react-icons/hi'
import { useState } from "react";
    
const NavItems =  [ 
    {to:'/dashbord' , label : 'Dashbord' , icon : HiOutlineViewGrid },
    {to:'joblist' , label : 'Jobslit' , icon : HiOutlineBriefcase },
    {label : 'Messages' , icon : HiOutlineChatAlt2 },
    {label : 'Profile' , icon : HiOutlineUser },
    {label : 'Setting' , icon : HiOutlineCog },
    ]

 
export const Sidebar = ({isOpen, onClose}) =>{
    return (
      <>
        {isOpen && (<div className="fixed inset-0 z-30 bg-black/50 lg:hidden " onClick={onClose}/>)}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transtion-transform duration-300 lg:translate-x-0
             ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col h-full pt-4 lg:pt-6">
            <nav className="flex-1 px-3 space-y-1 ">
              {NavItems.map(({ label, icon: Icon ,to }) => (
                <NavLink to={to} className= {({isActive}) =>`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors 
                ${isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`} >
                  <Icon size={20} />
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <NavLink className="flex items-center gap-3 justify-center w-full px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors ">
                {" "}
                <HiOutlineDocument size={20} /> post a job{" "}
              </NavLink>
            </div>
          </div>
        </aside>
      </>
    );
}
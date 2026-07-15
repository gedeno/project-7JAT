import { useState } from "react";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { HiOutlineSun , HiOutlineMoon } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
export function LoglinPage(){
    const [formdata , setformdata] = useState({})

    const inputhandler = (e) =>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    const navigate = useNavigate();
    const formsubmithandler = (e) =>{
        e.preventDefault()
        api.post('/api/token/',formdata)
        .then((response) =>{
            navigate('/home')
            console.log(response.data)
            localStorage.setItem(ACCESS_TOKEN,response.data.access)
            localStorage.setItem(REFRESH_TOKEN,response.data.refresh)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className="min-h-screen flex">
            <div className=" hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 bg-white rounded-full blur-3xl"/>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"/>
                </div>
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8">
                        <span className="text-2xl font-bold">A</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Wellcome to ASTU</h1>
                    <p className="text-lg text-primary-100 max-w-md leading-relaxed">
                        Track your job applications,discover opportunities ,and connect with employer across Adama
                    </p>
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">📋</div>
                            <div>
                                <p className="font-medium">Tranck Applications</p>
                                <p className="text-sm text-primary-200">Monitor all your job applications in one place</p>
                            </div>
                        </div >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">💼</div>
                            <div>
                                <p className="font-medium">Browse Jobs</p>
                                <p className="text-sm text-primary-200">Find remote , on-site and hybrid opportunities</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">💬</div>
                            <div>
                                <p className="font-medium">Connect</p>
                                <p className="text-sm text-primary-200">Message employers and applicatant directly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
                <div className="w-full max-w-md">
                    <div className="flex justiy-between items-center mb-8">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-xl">
                                <span className="text-white font-bold" >A</span>
                            </div>
                            <span className="text-2xl font-bold text-gary-900 dark:text-white">ASTU</span>
                        </div>
                        <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 ml-auto">
                            <HiOutlineSun/>
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sign in</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Don't have an account
                        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Sign up</Link>
                    </p>
                    <form className="space-y-5" onSubmit={formsubmithandler}>
                        <Input name='username' onChange={inputhandler} required lable="Username" placeholder="eg. ashenafi"/>
                        <Input name='password' onChange={inputhandler} required lable="password" placeholder="enter your password"/>
                        <Button className="w-full" size="lg" type="submit">Sign In</Button>
                    </form>
                </div>
            </div>
        
        </div>
    )
}
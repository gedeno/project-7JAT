import { use, useState } from "react";
import { FiUser ,FiLock } from "react-icons/fi";
import api from "./api";
import axios from "axios";
import {Navigate , useNavigate , Link} from 'react-router-dom'
import { HiOutlineSun ,HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "../Context/ThemeContext";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
export default function Regiserpage(){

    const {darkMode , toggleTheme } = useTheme()

    const [loading,setLoding] = useState({})
    const [formdata , setformdata ] = useState({})
    
    const inputChangehandler = (e) =>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    const [errors , seterrors] = useState('')
    const navigate = useNavigate()
    const fromsubmithandler = (e) =>{
        e.preventDefault()
        if(formdata.password !== formdata.confirm_password){
            const errors = "passowrd and confirm password does not match"
            seterrors(errors)
            return
        }
        axios.post('http://127.0.0.1:8000/users/user/', formdata)
        .then((resp)=>{
            console.log(resp.data)
            navigate('/login')
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    return(
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
            <div className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-8">
                    <Link className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">A</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">ASTU</span>
                    </Link>
                    <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800">
                        {darkMode?<HiOutlineSun size={20}/> :<HiOutlineMoon size={20} />}
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 ">Create account</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Already have an account
                        <Link className="text-primary-600 hover:text-primary-700 font-medium" to="/login"> Sign in</Link>
                    </p>
                    <form onSubmit={fromsubmithandler} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="first_name" onChange={inputChangehandler} required lable= 'First Name'/>
                            <Input name= "last_name" onChange={inputChangehandler} required lable="Last Name"/>
                        </div>
                        <Input name='username' onChange={inputChangehandler} required lable="Username"/>
                        <Input name='email' onChange={inputChangehandler} required lable="Email"/>
                        <Input name='password' onChange={inputChangehandler} required lable='password'/>
                        <Input name='confirm_password' onChange={inputChangehandler} required lable='confirm password'/>
                        {
                        errors && <p className="text-red-500">{errors}</p>

                        }
                        <p>{errors}</p>
                        <Button className="w-full" size="lg" type="submit">
                            Create Account
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

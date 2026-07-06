import { use, useState } from "react";
import { FiUser ,FiLock } from "react-icons/fi";
import api from "./api";
import axios from "axios";
import {Navigate , useNavigate , Link} from 'react-router-dom'
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
export default function Regiserpage(){
    const [loading,setLoding] = useState({})
    const [formdata , setformdata ] = useState({})
    
    const inputChangehandler = (e) =>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    const navigate = useNavigate()
    const fromsubmithandler = (e) =>{
        e.preventDefault()
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
        <div>
    
        <h2 className="mb-2 text-2xl font-bold">create account</h2>
        <p className="mb-8 text-sm text-slate-500" >Join thousands of professionals today</p>
        <form className="space-y-5" onSubmit={fromsubmithandler} >
            <Input name="username"  onChange={inputChangehandler} type="text"  placeholder="username"/><br />
            <Input name="email" type="email" onChange={inputChangehandler} placeholder="email ..." /><br />
            <Input name="password" onChange={inputChangehandler} type="password" placeholder="password"/><br />
            <Button type="submit" className="w-full">create Account</Button>
            <Link to= "/login" className="font-medium text-brand-600 hover:underline"  >Sign in</Link>
            
        </form>
        </div>
    )
}

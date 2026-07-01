import { use, useState } from "react";
import api from "./api";
import axios from "axios";
import {Navigate , useNavigate} from 'react-router-dom'
export default function Regiserpage(){
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
        <>
        <h1>WELLCOME TO REGISTER PAGE</h1>
        <form action="" onSubmit={fromsubmithandler}>
            <label htmlFor="">username :</label>
            <input name="username" onChange={inputChangehandler} type="text"  placeholder="username"/><br />
            <label htmlFor="">emali :</label>
            <input name="email" type="email" onChange={inputChangehandler} placeholder="email ..." /><br />
            <label htmlFor="">password :</label>
            <input name="password" onChange={inputChangehandler} type="password" placeholder="password"/><br />
            <button type="submit">submit</button>
        </form>
        </>
    )
}

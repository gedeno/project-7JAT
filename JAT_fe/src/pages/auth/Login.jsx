import { useState } from "react";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        <>
        <h1>WELLCOME TO LOGIN PAGE</h1>
        <form action="" onSubmit={ formsubmithandler }>
            <label htmlFor="">username :</label>
            <input onChange={inputhandler} name="username" type="text" placeholder="username" id="" /><br />
            <label htmlFor="">password :</label>
            <input onChange={inputhandler} type="password" name="password" id="" /><br />
            <button type="submit">submit</button>
        </form>
        </>
    )
}
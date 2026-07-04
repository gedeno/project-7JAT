import api from "../auth/api";
import { useState , useEffect } from "react";
import { useNavigate , Navigate } from "react-router-dom";

export const Dashbord = () => {
    const [formdata , setformdata] = useState({})

    const inputhandler = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    const navigate = useNavigate()

    const submithandler = (e) => {
        e.preventDefault()
        const formD = new FormData()
        formD.append('title',formdata.title)
        formD.append('description',formdata.description)
        formD.append('requirement',formdata.requirement)
        formD.append('responsibilty',formdata.responsibilty)
        formD.append('salary',formdata.salary)
        formD.append('job_type',formdata.job_type)
        formD.append('Employment',formdata.Employment)
        api.post('jobs/job/',formD)
        .then((res) => {
            console.log(res.data)
            navigate('/home')
        })
    }
    return(
        <>
        <h1>post jobs</h1>
        <form action="" onSubmit={submithandler}>
            <label htmlFor="">title:</label>
            <input onChange={inputhandler} type="text" name="title" id="" /> <br />
            <label htmlFor="">description :</label>
            <input onChange={inputhandler} type="text" name="discription" placeholder="discription" /> <br />
            <label htmlFor="">requirement :</label>
            <input onChange={inputhandler} type="text" name="requirement" /> <br />
            <label htmlFor="">responsibilty :</label>
            <input onChange={inputhandler} type="text" name="responsibilty" id="" /> <br />
            <label htmlFor="">salary :</label>
            <input onChange={inputhandler} type="text" name="salary" /> <br />
            <label htmlFor="">job type :</label>
            <input onChange={inputhandler} type="text" name="job_type" id="" /> <br />
            <label htmlFor="">Employment :</label>
            <input onChange={inputhandler} type="text" name="Employment" id="" /> <br />
            <button type="submit" >submit</button>
        </form>
        </>
    )
}
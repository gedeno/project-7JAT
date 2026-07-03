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
        const formD = new.FormData()
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
}
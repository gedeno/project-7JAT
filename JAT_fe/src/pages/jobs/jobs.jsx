import api from "../auth/api";
import { useState , useEffect } from "react";

export const Joblist = () =>{
    const [Jobs, setJobs ] =useState([])
    
    useEffect(()=>{
        api.get('/jobs/job/')
        .then((res)=>{
            console.log(res.data)
            setJobs(res.data)
        })
    },[])
    return(
        <>
        <h1>ellow world</h1>
        {
            Jobs.map((item)=>(
                <div key={item.id}>
                    <p>{item.title}</p>
                    
                </div>
            ))
        }
        </>
    )
}
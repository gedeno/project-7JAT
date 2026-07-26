import { useState ,useEffect } from "react";
import api from "../auth/api";
import { Button } from "../ui/Button";
import { useParams } from "react-router-dom";

export const Appliers = () => {
    const {id} = useParams()
    const [users,setusers] = useState([])
    useEffect(()=>{
        api.get(`/applis/myapp/${id}/`)
        .then((res)=>{
            setusers(res.data)
            console.log(res.data)
        })
    },[])
    return(
        <div>
            <div>
                {
                    users.map((item) =>(
                        <div key={item.id}>
                            <h1>{item.appliers.username}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
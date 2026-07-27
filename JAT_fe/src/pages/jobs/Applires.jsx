import { useState ,useEffect } from "react";
import api from "../auth/api";
import { Button } from "../ui/Button";
import { useParams } from "react-router-dom";

export const Appliers = () => {

    const statusBadge = {
    accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    reviewed:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
   };
    const {id} = useParams()
    const [users,setusers] = useState([])
    useEffect(()=>{
        api.get(`/applis/myapp/${id}/`)
        .then((res)=>{
            setusers(res.data)
            console.log(res.data)
            
        })
    },[])
    const [jobappruvment , setjobappruvment] = useState({})
    const inputchangehandler = (e) =>{
        setjobappruvment({
            ...jobappruvment,
            [e.target.name]:e.target.value
        })}
    const employnentstatus = ['pending','accepted','rejected','reviewed']
    const formsubmithandler = (e,item) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('application',jobappruvment.application)
        api.patch(`/applis/appruvment/${item.id}/`,fd)
        .then((res)=>{
            console.log(res.data)
        })}

    return(
        <div>
            <h1>appliers</h1>
            <div>
                {
                    users.map((item) =>(
                        <div key={item.id} className=" mb-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col sm:items-center justify-between gap-3">
                            <h1>{item.appliers.username}</h1>
                             <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusBadge[item.application]}`}>
                              {item.application} </span>
                              <h1>{item.application}</h1>
                            <form  onSubmit={(e)=>formsubmithandler(e,item)} >
                                <select name="application" onChange={inputchangehandler}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm">
                                    {employnentstatus.map((t)=> <option key={t} value={t}>{t}</option>)}
                                </select>
                                <Button type="submit">update</Button>
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
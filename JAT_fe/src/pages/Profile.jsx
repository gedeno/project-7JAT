import { useState ,useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { Loader } from "./ui/Loader";
import { jwtDecode } from "jwt-decode";
import { HiOutlineMail , HiOutlinePhone ,HiOutlineLocationMarker } from "react-icons/hi";
import api from "./auth/api";


export const Profile = () =>{
    const statuseColors ={
        accepted:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        rejected:'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        reviewed:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        pending:'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }
    const status = 'accepted'


    const [user , setuser] = useState({})
    useEffect(()=>{
        const token = localStorage.getItem('access')
        const decode = jwtDecode(token)
        const id = decode.user_id
        api.get(`/users/user/${id}`)
        .then((res)=>{
            setuser(res.data)
        })
    },[])
    const f_name = user.first_name?.[0]
    const l_name = user.last_name?.[0]

    const [getjob , setgetjob]= useState([])
    useEffect(()=>{
        api.get('/applis/apply')
        .then((res)=>{
            setgetjob(res.data)
            console.log(res.data)
        })
    },[])
    const job_len = getjob.length


    
    return(
        <div className="max-w-4xl mx-auto space-y-6" >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden" >
                <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700"/>
                <div className="px-6 pb-6 -mt-12">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-primary-600">{f_name}{l_name}</span>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</h1>
                            <p className="text-gray-500 capitalize"  >@{user.username}</p>
                        </div>
                        <Button variant='outline'>Edit Profile</Button>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My applications({job_len})</h2>
                {job_len === 0?(
                    <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-800">
                        <p className="text-gray-500">You Havent-t applied to any jobs yet.</p>
                    </div>
                ):(
                    <div className="space-y-3">
                        {getjob.map((app)=>(
                            <div key={app.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col sm:items-center justify-between gap-3">
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">{app.job.title}</h3>
                                    <p className="text-sm text-gray-500">{app.job.company}</p>
                                    <p className="text-xs text-gray-400 mt-1">{app.cv_resume.split("/").pop()}</p>
                                </div>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize self-start ${statuseColors[status]}`} >{status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
import { useEffect , useState } from "react";
import { Button } from "./ui/Button";
import { HiOutlineCheck , HiOutlineX , HiOutlineTrash } from "react-icons/hi";
import axios from "axios";
import api from "./auth/api";
import { useNavigate } from "react-router-dom"

export const Admin = () => {
    const [activetab , setactivetab] = useState('pending')
    
    const pendingjob = 0

    const [getdata ,setgetdata ] = useState([])
    useEffect(()=>{
      api.get('/jobs/job/')
      .then((res)=>{
        setgetdata(res.data)
      })
    },[])
    const pendingjoblength = getdata.filter((job) => !job.is_approved).length
    const [users ,setusers] = useState([])
    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/users/user/')
        .then((res) =>{
            setusers(res.data)
            console.log(res.data)
        })
    },[])
    const tabs =[ {id:'pending' , label:`pending Jobs (${pendingjoblength})`},
                  {id:'users' , label:`Users (${users.length})`},
                  {id: 'jobs' , label:`All jobs (${getdata.length})`}
    ]

    const navigate = useNavigate()
    const jobappruvalhandler = (job)=>{
        api.patch(`/jobs/jobapproval/${job.id}/`,
            {is_approved : true}
        ).then((res) => {
            navigate('/admin')
            console.log(res.data)
        })}
    const deletejobhandler = (job) =>{
        api.delete(`/jobs/jobapproval/${job.id}/`)
        .then((res) => {
            navigate('/admin')
        })
    }

    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage users, approve job posts, and oversee all jobs</p>
            </div>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {tabs.map((tab)=>(
                    <button
                    className={`flex-1 px-4 rounded-md text-sm font-medium transition-colors${
                        activetab ===tab.id ?'bg-white dark:bg-gray-900 text-primary-600 shadow-sm'
                        :'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                    }`}
                     key={tab.id} onClick={() => setactivetab(tab.id)}>{tab.label}</button>
                ))}
            </div>
            {activetab === 'pending' && (
                <div className="space-y-4">
                    {getdata.length === 0 ?(
                        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800" >
                            <p>No pending jobs to review</p>
                        </div>
                    ):(
                        getdata.map((job) => (
                            !job.is_approved&&(
                            <div key={job.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 border-gray-800 p-5" >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white" >{job.title}</h3>
                                        <p className="text-sm text-gray-500">{job.company} . {job.job_type} . {job.Employment_type}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{job.description}</p>
                                        <p className="text-xs text-gray-400 mt-2">Deadline {job.deadline}</p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <Button size="sm" onClick={() =>jobappruvalhandler(job)}><HiOutlineCheck/> Approve</Button>
                                        <Button variant="danger" size="sm"><HiOutlineX/> Reject</Button>
                                    </div>
                                </div>
                            </div>
                            )
                        ))
                    )}
                </div>
            )}
            {activetab === 'users' && (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">User</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">Email</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">Role</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-500">Location</th>
                                    <th className="text-right px-5 py-3 font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800" >
                                {users.map((userr) =>(
                                    <tr key={userr.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-5 py-3">
                                            <div className="flex item-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">{userr.first_name[0]} {userr.last_name[0]}</span>
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{userr.first_name} {userr.last_name}</span>
                                            </div>
                                        </td>
                                        <td className = "px-5 py-3 text-gray-500 dark:text-gray-400">{userr.email}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize bg-gray-100 text-gray-700 dark:text-gray-400 dark:bg-gray-800`}>user</span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">Addis abeba</td>
                                        <td className="px-8 py-3 text-right" >
                                            <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><HiOutlineTrash size={16}/></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {activetab === 'jobs' && (
                <div className="space-y-3">
                    {getdata.map((job) => (
                        <div key={job.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white" >{job.title}</h3>
                                <p className="text-sm text-gray-500" >{job.company} . <span>{job.location}</span></p>
                            </div>
                            <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" onClick ={()=>deletejobhandler(job)} ><HiOutlineTrash size={18}/></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}
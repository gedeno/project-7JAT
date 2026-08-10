import api from "../auth/api";
import { useState , useEffect, lazy } from "react";
import { useNavigate , Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { JobCard } from "../ui/JobCard";
import { Loader } from "../ui/Loader";
import { jwtDecode } from "jwt-decode";
import { HiOutlineBriefcase ,HiOutlineDocumentText ,HiOutlineClock,HiOutlineCheckCircle } from "react-icons/hi";
export const Dashbord = () => {
    const [getjob , setgetjob ] = useState([])
    useEffect(()=>{
        api.get('/jobs/job/')
        .then((res)=>{
            setgetjob(res.data)
        })
    },[])
    const joblength =  getjob.filter((job) => job.is_approved).length
    const pendingjoblength = getjob.filter((job) => !job.is_approved).length
    const alljoblength = getjob.length
    const [myapplics, setmyapplics ] = useState([])
    useEffect(()=>{
        api.get('/applis/apply')
        .then((res)=>{
            setmyapplics(res.data)
        })
    },[])
    const myappliength = myapplics.length


    const [user,setuser] = useState({})
    useEffect(()=>{
        const token =localStorage.getItem('access')
        const decoded = jwtDecode(token)
        const id = decoded.user_id
        api.get(`/users/user/${id}`)
          .then((res)=>{
                setuser(res.data)
            })
        },[])

    const issuperuser = user.is_superuser
    const statCards = issuperuser ?
    [
        { label: 'Total Jobs', value:alljoblength, icon: HiOutlineBriefcase, color: 'bg-blue-500' },
        { label: 'Approved', value: joblength, icon: HiOutlineCheckCircle, color: 'bg-green-500' },
        { label: 'Pending Approval', value: pendingjoblength, icon: HiOutlineClock, color: 'bg-amber-500' },
        { label: 'Applications', value: myappliength, icon: HiOutlineDocumentText, color: 'bg-purple-500' },
      ]
    :[
        {label:'Available Jobs' , icon:HiOutlineBriefcase,color:'bg-primary-500', value:joblength},
        {label:'My Applications',icon:HiOutlineDocumentText,color:'bg-blue-500', value:myappliength},
        {label:'Pending Review', icon:HiOutlineClock,color:'bg-amber-500',value:0},
        {label:'Approved Jobs' , icon:HiOutlineCheckCircle,color:'bg-green-500',value:joblength}
    ]
    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wellcome back {user.username}!👋</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Track your applications and discover new opportunities.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(({label ,icon:Icon , color ,value})=>(
                    <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white `}>
                            <Icon size={24}/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                        </div>
                    </div>
                ))}
            </div>
            {issuperuser && pendingjoblength > 0 &&(
                <div className=" bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-amber-800 dark:text-amber-300">{pendingjoblength} job{pendingjoblength !== 1 ? 's': ''} awaiting approval</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">Review and approve pending job posts</p>
                    </div>
                    <Link className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors" to = "/admin">Review Now</Link>
                </div>
            )
                
            }
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Job listings</h2>
                    <Link to="/joblist" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {getjob.map((item) =>(
                        item.is_approved &&(
                        <JobCard key={item.id} item={item} />
                    )
                    ))}
                </div>
            </div>
        </div>
    )
}
import api from "../auth/api";
import { useParams } from "react-router-dom";
import { useState ,useEffect } from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineArrowLeft} from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
export const JobDetail = () =>{
    const {id } = useParams()
    const [jobdetail ,setjobdetail] = useState({})
    useEffect(()=>{
        api.get(`/jobs/jobdetail/${id}/`)
        .then((res)=>{
            setjobdetail(res.data)
    
        })
    },[])
    return(
        <div className=" max-w-4xl mx-auto space-y-6">
            <Link to = '/joblist' className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                <HiOutlineArrowLeft size={16}/>
                Back to jobs
            </Link>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-medium px-3 py-1 founded-full capitalize">{jobdetail.title}</h1>
                            <p>{jobdetail.company}</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <HiOutlineCurrencyDollar className="text-primary-500" size={20}/>
                            <span>{jobdetail.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MdWorkOutline className="text-primary-500" size={20}/>
                            <span>{jobdetail.Employment_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <HiOutlineLocationMarker className="text-primary-500" size={20}/>
                            <span>{jobdetail.location} {jobdetail.job_type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <HiOutlineClock/>
                            <span>{jobdetail.deadline}</span>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Discription</h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line"
                        >{jobdetail.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link to={`/joblist/${jobdetail.id}`}><Button size="lg" >Apply for this Job</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
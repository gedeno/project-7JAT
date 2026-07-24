import { Link } from "react-router-dom";
import { HiOutlineLocationMarker , HiOutlineClock ,HiOutlineCurrencyDollar } from "react-icons/hi";
import {MdWorkOutline} from 'react-icons/md'
import { Button } from "./Button"
import api from "../auth/api";
const JobTypeColors = {
        Remote:'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        'On-site': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Hybrid:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
        }

const statusColors = {
    approved : 'bg-green-100',
    pending: 'bg0amber-100',
    rejected :' bg-red-100'
}


export const JobCard = ({item}) => {
    const postcol = item.job_type
    return (
      <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800
       p-5 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 ">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {" "}
              {item.company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${JobTypeColors[item.job_type]}`}>{item.job_type}</span>
          </div>
        </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {item.description}
                </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">     
          <span className="flex items-center gap-1.5">
            <HiOutlineCurrencyDollar className="text-primary-500 shrink-0"/>
            {item.salary}</span>
          <span className="flex items-center gap-1.5">
            <MdWorkOutline className="text-primary-500 shrink-0" />
            {item.Employment_type}
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineLocationMarker className="text-primary-500 shrink-0" />
            {item.location}
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineClock className="text-primary-500 shrink-0" />
            {item.deadline}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link className="flex-1" to={`/jobdetail/${item.id}`}>
            <Button variant="outline" className="w-full" size="sm">View Details</Button>
          </Link>
          <Button  size="sm" className="flex-1" > <Link to={`/joblist/${item.id}`} > Apply Now </Link></Button>
        </div>
      </div>
    );
}
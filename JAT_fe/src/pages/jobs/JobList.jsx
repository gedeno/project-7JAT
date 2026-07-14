import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";
import { JobCard } from "../ui/JobCard";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Loader } from "../ui/Loader";
import api from "../auth/api";
export const JOblist =() => {
    const loading = false
    const [showfilter, setshowfilter] = useState(false)
    const [showcreatemodal ,setshowcreatemodal] = useState(false)

    const [formdata, setformdata ] =useState({})
  

    const inputchangehandler =(e) =>{
      setformdata({
        ...formdata,
        [e.target.name]:e.target.value
      })
    }

    const formsubmithandler = (e) =>{
      api.post('/jobs/job/',formdata)
      .then((res)=>{
        console.log(res.data)
      })
    }

    


    const jobs = 1
    const Job_types = ['Remote' , 'On-site', 'Hybrid']
    const Employment_type = ['Contrat','Permanent','Temporary']
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-gray-500 dark:text-white">Job listing</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              jobs not found
            </p>
          </div>
          <Button onClick={() => setshowcreatemodal(true)} >+ Post a Job</Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <HiOutlineSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                placeholder="Search jobs by title , compny..."
                type="text"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 "
              />
            </div>
            <Button  onClick={()=> setshowfilter(!showfilter)}>
              <HiOutlineFilter size={18} />
              Filters
            </Button>
          </div>
          {showfilter && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  Job Type
                </label>
                <select
                  name=""
                  id=""
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All Types</option>
                  {Job_types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Employment Type
                </label>
                <select
                  name=""
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All Employment</option>
                  {Employment_type.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    
                    name=""
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  My jobs only
                </label>
              </div>
            </div>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : jobs === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No jobs found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <JobCard />
          </div>
        )}
        <Modal isOpen={showcreatemodal} onClose={()=>setshowcreatemodal(false)} title= 'post a New job' size="lg" >
          <form onSubmit={formsubmithandler} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input required name= 'title' onChange={inputchangehandler} lable="Job title" />
              <Input required  name='company' onChange={inputchangehandler} lable="company" />
            </div>
            <Input required  name= 'description' onChange={inputchangehandler} lable="discription" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input required  name='salary' onChange={inputchangehandler} lable="salary" />
              <Input required  name='location' onChange={inputchangehandler} lable="location" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label  className="bloack text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Job type</label>
                <select name = "job_type" id="" onChange={inputchangehandler} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm">
                  {Job_types.map((t) => (
                    <option>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label  className=" block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Employment type</label>
                <select name="Employment_type" onChange={inputchangehandler} id="" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2.5 text-sm ">
                  {Employment_type.map((t) => (
                    <option>{t}</option>
                  ))}
                </select>
              </div>
              <Input required  name= 'deadline' onChange={inputchangehandler} type="date" lable="Deadline" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={() => setshowcreatemodal(false)}>Cancel</Button>
              <Button type="submit">post</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
}
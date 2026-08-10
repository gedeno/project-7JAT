import { useState , useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";
import { HiOutlineArrowLeft , HiOutlineUpload } from "react-icons/hi";
import { Link } from "react-router-dom";
import api from "../auth/api";

export const Apply = () => {
    const {id} = useParams()

    const [formdata , setformdata] = useState({})

    const inputhandler = (e) =>{
        setformdata({
            ...formdata,
            [e.target.name] : e.target.value
    })}
    const filehandler = (e) =>{
        const file = e.target.files?.[0] ?? null
        setformdata({  
            ...formdata,
            [e.target.name] : file
        })
    }
    const navigate = useNavigate()
    const formsubmithandler = (e) => {
      e.preventDefault()
        const Fd = new FormData()
        Fd.append('cover_letter',formdata.cover_letter)
        Fd.append('portfolio_link',formdata.portfolio_link)
        Fd.append('github_link',formdata.github_link)
        Fd.append('cv_resume',formdata.cv_resume)
        api.post(`/applis/applic/${id}/`,Fd)
        .then((res)=>{
            console.log(res.data)
            navigate('/dashboard')
        })
        .catch((error)=>{
          console.error('Application submission failed:', error.response?.data ?? error.message)

        })
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600">
          <HiOutlineArrowLeft size={16} />
          Back to job details
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Apply for Position</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">backend developer at ASTU</p>

          <form className="space-y-5" onSubmit={formsubmithandler}>
            <Input
              onChange={inputhandler}
              required
              name='cover_letter'
              lable="Cover Letter"
              type="textarea"
              placeholder="Tell the employer why to you're a great fit for this role ..."
            />
            <Input onChange={inputhandler} name="portfolio_link" lable="portfolio link" type="text" />
            <Input onChange={inputhandler}t name="github_link" lable= "github link" type="text" id="" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload CV <span className="text-red-500">*</span>
              </label>
              <div className=" justify border-2 border-dashed rounded-xl p-8 text-center transition-colors border-gray-300 dark:border-gray-gray-700 hover:border-primary-400">
                <HiOutlineUpload className="mx-auto text-gray-400 mb-2 " size={32} />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">click to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF or word, max 10MB</p>
                <input onChange={filehandler} name="cv_resume" type="file" className="mt-3 text-sm text-center justify-center" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Link to={'/joblist'}> <Button variant="secondary" >Cancel</Button> </Link>
              
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </div>
      </div>
    );
}
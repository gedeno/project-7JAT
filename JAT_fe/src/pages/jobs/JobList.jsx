import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { JobCard } from "../ui/JobCard";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Loader } from "../ui/Loader";
export const JOblist =() => {
    const showfilters = true
    const loading = true
    const jobs = 0
    const Job_types = ['Remote' , 'On-site', 'Hybrid']
    const Employment_type = ['Contrat','Permanent','Temporary']
    return(
        <div>
            <div>
                <div>
                    <h1>Job listing</h1>
                    <p></p>
                </div>
                <Button>+ Post a Job</Button>
            </div>

            <div>
                <div>
                    <div>
                        <HiOutlineSearch/>
                        <input type="text" />
                        
                    </div>
                    <Button>
                            <HiOutlineFilter/> 
                            Filters
                    </Button>
                </div>
                {showfilters &&(
                    <div>
                        <div>
                            <label htmlFor="">Job Type</label>
                            <select name="" id="">
                                <option value="">All Types</option>
                                {Job_types.map((t)=>(
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">
                                <input type="text" name="" id="" />
                                My jobs only
                            </label>
                        </div>
                    </div>
                )}
            </div>
            {loading ?
                (<Loader/>

                ):jobs === 0?(
                    <div>
                        <p>No jobs found</p>
                        <p>Try adjusting your search or filter</p>
                    </div>
                ):(
                    <div>
                        <JobCard/>
                    </div>
                )}
                <Modal>
                    <form action="">
                        <div>
                            <Input lable='Job title'/>
                            <Input lable='company'/>
                        </div>
                        <Input lable='discription'/>
                        <div>
                            <Input lable='salary'/>
                            <Input lable='location'/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="">Job type</label>
                                <select name="" id="">
                                    {Job_types.map((t)=> <option>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Employment type</label>
                                <select name="" id="">
                                    {Employment_type.map((t) => <option value="">{t}</option> )}
                                </select>
                            </div>
                            <Input lable="Deadline" />
                        </div>
                        <div>
                            <Button></Button>
                            <Button></Button>
                        </div>
                    </form>
                </Modal>
        </div>
    )
}
import { useEffect , useState } from "react";
import { Button } from "./ui/Button";
import { HiOutlineCheck , HiOutlineX , HiOutlineTrash } from "react-icons/hi";

export const Admin = () => {
    const [activetab , setactivetab] = useState('pending')
    const tabs =[ {id:'pending' , label:'pending Jobs (5)'},
                  {id:'users' , label:'Users (3)'},
                  {id: 'Jobs' , label:'All jobs (10)'}
    ]
    const pendingjob = 0

    const [getdata ,setgetdata ] = useState([])
    useEffect(()=>{
      api.get('/jobs/job/')
      .then((res)=>{
        setgetdata(res.data)
      })
    },[])

    return(
        <div>
            <div>
                <h1>Admin Panel</h1>
                <p>Manage users, approve job posts, and oversee all jobs</p>
            </div>
            <div>
                {tabs.map((tab)=>(
                    <button onClick={() => setactivetab(tab.id)}>{tab.label}</button>
                ))}
            </div>
            {activetab === 'pending' && (
                <div>
                    {pending === 0 ?(
                        <div>
                            <p>No pending jobs to review</p>
                        </div>
                    ):(
                        pendingjob.map((job) => (
                            <div>
                                <div>
                                    <div>
                                        <h3>Backend Dev</h3>
                                        <p>permanent</p>
                                        <p>we are loking for backend developer</p>
                                        <p>posted 4-5-2026 . Deadline 20-5-2026</p>
                                    </div>
                                    <div>
                                        <Button><HiOutlineCheck/> Approve</Button>
                                        <Button><HiOutlineX/> Reject</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {activetab === 'users' && (
                <div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <tr>User</tr>
                                    <tr>Email</tr>
                                    <tr>Role</tr>
                                    <tr>Location</tr>
                                    <tr>Actions</tr>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {activetab === 'jobs' && (
                <div>
                    {getdata.map((job) => (
                        <div>
                            <div>
                                <h3>{job.title}</h3>
                                <p>{job.company} . <span>{job.location}</span></p>
                            </div>
                            <button><HiOutlineTrash/></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) 
}
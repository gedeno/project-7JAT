import api from "../auth/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Cv_apply = () => {
    const [formdata , setformdata] = useState({})
    const inputhandler = (e) =>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    const filehander = (e) => {
        const file = e.target.files?.[0] ??null
        setformdata({
            ...formdata,
            [e.target.name]:file
        })
    }
    const naviget = useNavigate()
    const submithandler = (e) => {
        api.post('/applis/apply/',formdata)
        .then((res) => {
            console.log(res.data)
            naviget('/home')
        })
    }
    return(
        <>
        <div>
            <form action="">
                <label htmlFor="">cover leter:</label>
                <input type="text" name="cover_letter" id="" /><br />
                <label htmlFor="">file</label>
                <img src="file" alt="" name = "cv_resume" /> <br />
                <label htmlFor="">portfolio link : </label>
                <input type="text" name="portfolio_link" /> <br />
                <label htmlFor="">github link :</label>
                <input type="text" name="github_link" />
                <button>apply</button>
            </form>
        </div>
        </>
    )

}

import { useState , useEffect } from "react"
import { useNavigate , useSearchParams } from "react-router-dom"
import { JobCard } from "../ui/JobCard"
import { Input } from "../ui/input"
import { Button } from "../ui/Button"
import api from "../auth/api"
import {jwtDecode} from 'jwt-decode'


export const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access')
    const decoded = jwtDecode(token)
    const id = decoded.user_id
    api.get(`/users/user/${id}`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  return (
    <>
      <h1>Name: {user.username}</h1>
      <h1>Hello world</h1>
    </>
  );
};
import { useState,useEffect } from 'react'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import Regiserpage from './pages/auth/Registerpage'
import { Home } from './pages/jobs/home'
import { LoglinPage } from './pages/auth/Login'
import { Joblist } from './pages/jobs/jobs'
import { Dashbord } from './pages/dashbordpage/Dashbord'
import { Sidebar } from './pages/ui/Sidebar'
import { Navbar } from './pages/ui/Navbar'
import { MainLayout } from './pages/layout/MainLayout'
import { Button } from './pages/ui/Button'
import { JobCard } from './pages/ui/JobCard'

function App() {
  const [count, setCount] = useState(0)
  localStorage.setItem('theme', 'dark');
  window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(() => {
    const root = document.documentElement;
    if (true) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);
  return (
    <>
    <BrowserRouter>
    
   
    <JobCard/>
    <Routes> 
      <Route path='/dashbord' element = {<Dashbord/>} />
      <Route path='/joblist' element = {<Joblist/>} />
      <Route path='/login' element = {<LoglinPage/>} />
      <Route path='/home' element = {<Home/>} />
      <Route path='/register' element = {<Regiserpage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

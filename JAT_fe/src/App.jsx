import { useState,useEffect } from 'react'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import Regiserpage from './pages/auth/Registerpage'
import { Home } from './pages/jobs/home'
import { LoglinPage } from './pages/auth/Login'
import { Dashbord } from './pages/dashbordpage/Dashbord'
import { Sidebar } from './pages/ui/Sidebar'
import { Navbar } from './pages/ui/Navbar'
import { MainLayout } from './pages/layout/MainLayout'
import { Button } from './pages/ui/Button'
import { JOblist } from './pages/jobs/JobList'
import { Apply } from './pages/jobs/Apply'

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
  
    <Routes> 
      <Route path='/login' element = {<LoglinPage/>} />
      <Route path='/register' element = {<Regiserpage/>}/>
      <Route element={<MainLayout/>}>
        <Route path='/joblist/:id' element={<Apply/>}/>
        <Route path='/dashbord' element = {<Dashbord/>} />
        <Route path='/joblist' element = {<JOblist/>} />
        <Route path='/home' element = {<Home/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

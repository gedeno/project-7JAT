import { useState,useEffect } from 'react'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import Regiserpage from './pages/auth/Registerpage'
import { LoglinPage } from './pages/auth/Login'
import { Dashbord } from './pages/dashbordpage/Dashbord'
import { MainLayout } from './pages/layout/MainLayout'
import { JOblist } from './pages/jobs/JobList'
import { Apply } from './pages/jobs/Apply'
import { Profile } from './pages/Profile'
import { ThemeProvider } from './pages/Context/ThemeContext'
import { Setting } from './pages/Setting'
import { JobDetail } from './pages/jobs/JobDetail'
import { Appliers } from './pages/jobs/Applires'
import { Admin } from './pages/Admin'

function App() {
  
  return (
    <>
    
    <BrowserRouter>
    <ThemeProvider>
    <Routes> 
      <Route path='/login' element = {<LoglinPage/>} />
      <Route path='/register' element = {<Regiserpage/>}/>
      <Route element={<MainLayout/>}>
        <Route path='/admin' element = {<Admin/>}/>
        <Route path='/Appliers/:id' element = {<Appliers/>} />
        <Route path='/jobdetail/:id' element = {<JobDetail/>}/>
        <Route path='/setting' element = {<Setting/>}/>
        <Route path='/profile' element ={<Profile/>} />
        <Route path='/joblist/:id' element={<Apply/>}/>
        <Route path='/dashboard' element = {<Dashbord/>} />
        <Route path='/joblist' element = {<JOblist/>} />
      </Route>
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import Regiserpage from './pages/auth/Registerpage'
import { Home } from './pages/jobs/home'
import { LoglinPage } from './pages/auth/Login'
import { Joblist } from './pages/jobs/jobs'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
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

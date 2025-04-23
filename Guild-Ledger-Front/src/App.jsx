import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Outlet} from 'react-router-dom'
import GLNavbar from './components/Navbar'
import {UserContext, UserProvider} from './contexts/userContext'
import axios from 'axios'



function App() {
  const [user, setUser] = useState(null)

  const test_connection = async () => {
    try { 
      let response = await axios.get("http://127.0.0.1:8000/api/test")
      console.log(response)
  }
    catch {
      
        console.log("Reached Server (recieved 404 from api/test)")
      
    }
  }

  useEffect(() => {
    test_connection()
  }, [])
  
  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <UserProvider>
      <GLNavbar />
      <Outlet />
    </UserProvider>
  )
}

export default App

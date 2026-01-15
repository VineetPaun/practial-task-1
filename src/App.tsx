import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/Navbar'

function App() {
  const [loggedIn, isLoggedIn] = useState(false)
  
  return (
    <>
      <Navbar/>
      {/* {isLoggedIn && <p>Hello</p>} */}
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { Drawer } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Drawer/>
    </>
  )
}

export default App

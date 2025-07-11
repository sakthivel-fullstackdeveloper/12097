import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Shorten from './components/Shorten' 

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Shorten/>
    </>
  )
}

export default App

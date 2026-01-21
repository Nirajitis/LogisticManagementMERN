import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import LoadBoard from './Components/LoadBoard'
import ControlCenter from './Components/ControlCenter'

function App() {
  // ✅ Define shared state here
  const [loads, setLoads] = useState([])
  const [statusFilter, setStatusFilter] = useState([]);

  return (
    <>
      <Navbar />
      <div>
        {/* Pass down shared state + setter */}
        <ControlCenter setLoads={setLoads} loads={loads} />
        <LoadBoard loads={loads} setLoads={setLoads} />
      </div>
    </>
  )
}

export default App
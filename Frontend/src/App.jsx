import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import LoadBoard from "./Components/LoadBoard";
import Admin from "./Pages/Admin";
import ControlCenter from "./Components/ControlCenter";


// Dispatch history page
import Dispatch from "./Pages/Dispatch";
function App() {

  const [loads, setLoads] = useState([]);
  useEffect(() => {
  fetch("http://localhost:4001/api/loads")
    .then(res => res.json())
    .then(result => {
      console.log("API RESULT:", result);   // ADD THIS
      setLoads(result.data);               // IMPORTANT
    })
    .catch(err => console.error(err));
}, []);


  return (
    <>
      {/* Navbar always visible */}
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-20">

        <Routes>

          {/* MAIN PAGE — ACTIVE LOADS */}
          <Route
            path="/"
            element={
              <>
                <ControlCenter loads={loads} setLoads={setLoads} />

                
                <LoadBoard loads={loads} setLoads={setLoads} />
                
              </>
            }
          />

          {/* DISPATCH PAGE — COMPLETED LOADS */}
          <Route
            path="/dispatch"
            element={<Dispatch loads={loads} />}
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Routes>

      </main>
      
    </>
  );
}

export default App;

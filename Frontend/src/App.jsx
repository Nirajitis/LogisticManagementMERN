import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import LoadBoard from "./Components/LoadBoard";
import Admin from "./Pages/Admin";
import ControlCenter from "./Components/ControlCenter";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dispatch from "./Pages/Dispatch";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {

  const location = useLocation();
  const [loads, setLoads] = useState([]);
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:4001/api/loads")
      .then(res => res.json())
      .then(result => {
        console.log("API RESULT:", result);
        setLoads(result.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* Hide navbar on login & register */}
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        <Navbar />
      }

      <main className="min-h-screen bg-gray-50 pt-20">

        <Routes>

          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />

          {/* REGISTER */}
          <Route path="/register" element={<RegisterPage />} />

          {/* PROTECTED HOME */}
          <Route
            path="/"
            element={
            <ProtectedRoute>
              <>
                <ControlCenter loads={loads} setLoads={setLoads} />
                <LoadBoard loads={loads} setLoads={setLoads} />
              </>
            </ProtectedRoute>
            }
            />

          {/* PROTECT DISPATCH */}
          <Route
            path="/dispatch"
            element={
              <ProtectedRoute>
                <Dispatch loads={loads} />
              </ProtectedRoute>
            }
          />
                    {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>
    </>
  );
}

export default App;

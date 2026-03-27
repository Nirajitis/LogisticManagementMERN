import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import LoadBoard from "./Components/LoadBoard";
import Admin from "./Pages/Admin";
import ControlCenter from "./Components/ControlCenter";
import LoginPage from "./Pages/LoginPage";
import Dispatch from "./Pages/Dispatch";
import CreateUser from "./Pages/CreateUser";

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
      {location.pathname !== "/" &&
      location.pathname !== "/register" &&
      <Navbar />}

      <main
  className={`min-h-screen bg-gray-50 ${
    location.pathname === "/login" ||
    location.pathname === "/register"
      ? ""
      : "pt-20"
  }`}
>

        <Routes>

  {/* Login Page (default) */}
  <Route path="/" element={<LoginPage />} />

  {/* Home Page (Protected) */}
  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <>
          <ControlCenter loads={loads} setLoads={setLoads} />
          
        </>
      </ProtectedRoute>
    }
  />

  <Route
    path="/create-user"
    element={
      localStorage.getItem("role") === "admin" ? (
        <CreateUser />
      ) : (
        <Navigate to="/home" replace />
      )
    }
  />

  {/* Other protected pages */}
  <Route
    path="/dispatch"
    element={
      <ProtectedRoute>
        <Dispatch loads={loads} />
      </ProtectedRoute>
    }
  />

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

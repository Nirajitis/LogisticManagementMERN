import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/LoginPageImage.jpg";

function RegisterPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      await axios.post("http://localhost:4001/api/auth/register", {
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          
          <img
            src={loginImage}
            alt="Logistics"
            className="w-34 mx-auto mb-12"
            />
          <h2 className="text-3xl font-bold text-center">
            Register Now
          </h2>

          {error && (
            <div className="alert alert-error mt-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-4 space-y-4">

            <input
              type="email"
              className="input input-bordered"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="input input-bordered"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

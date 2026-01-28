import React, { useState } from "react";
import axios from "axios";
import loginImage from "../assets/LoginPageImage.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:4001/api/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect after login
      window.location.href = "/";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            SmartFleet Login
          </h2>

          {error && (
            <div className="alert alert-error mt-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-4 space-y-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="link link-primary">
                Register Now
            </a>
            </p>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

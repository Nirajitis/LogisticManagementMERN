import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:4001/api/auth/create-user",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessage(res.data.message);
      setForm({
        fullName: "",
        phone: "",
        email: "",
        password: ""
      });
      setErrors({});

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error creating user"
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Employee</h2>

      {message && (
        <div className="alert alert-info mb-3">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button className="btn btn-primary w-full">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
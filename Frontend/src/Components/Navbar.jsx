import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Active link styling
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500";

  const NavItems = (
    <>
      {/* MAIN DISPATCH PAGE */}
      <li>
        <NavLink to="/" className={navLinkClass}>
          Dispatch
        </NavLink>
      </li>

      {/* OPTIONAL LOAD HISTORY PAGE */}
      <li>
        <NavLink to="/dispatch" className={navLinkClass}>
          Load History
        </NavLink>
      </li>

      <li>
        <NavLink to="/admin" className={navLinkClass}>
          Admin
        </NavLink>
      </li>
    </>
  );

  const UserAvatar = (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={
              profileImage ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
      >
        <li>
          <label className="cursor-pointer">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>
        </li>

        <li>
          <button onClick={handleLogout} className="w-full text-left">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="navbar bg-white fixed top-0 w-full z-40 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {NavItems}
          </ul>
        </div>

        <span
          className="text-2xl font-bold cursor-pointer ml-2"
          onClick={() => navigate("/")}
        >
          SmartFleet
        </span>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavItems}</ul>
        </div>

        {UserAvatar}
      </div>
    </div>
  );
}

export default Navbar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // Profile image state
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Profile image upload handler
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

  const ThemeControl = (
    <label className="swap swap-rotate">

      <input type="checkbox" className="theme-controller" value="synthwave" />

      <svg
        className="swap-off h-8 w-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">

        <path d="M12,6.5A5.5,5.5,0,1,0,17.5,12A5.51,5.51,0,0,0,12,6.5Z" />

      </svg>

      <svg
        className="swap-on h-8 w-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">

        <path d="M21.64,13a1,1,0,0,0-1.05-.14" />

      </svg>
    </label>
  );

  const NavItems = (
    <>
      <li>
        <NavLink to="/dispatch">Dispatch</NavLink>
      </li>

      <li>
        <NavLink to="/maintenance">Maintenance</NavLink>
      </li>

      <li>
        <NavLink to="/admin">Admin</NavLink>
      </li>

      <li>
        <NavLink to="/ifta">IFTA</NavLink>
      </li>

      <li>
        <NavLink to="/help">Help</NavLink>
      </li>
    </>
  );

  const UserAvatar = (
    <div className="dropdown dropdown-end">

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
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
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
    <>
      <div className="navbar bg-white fixed top-0 w-full z-40">

        <div className="navbar-start">

          <div className="dropdown">

            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />

              </svg>

            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

              {ThemeControl}
              {NavItems}
              {UserAvatar}

            </ul>

          </div>

          <a className="text-2xl font-bold cursor-pointer">SmartFleet</a>

        </div>

        <div className="navbar-end">

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {ThemeControl}
              {NavItems}
            </ul>
          </div>

          {UserAvatar}

        </div>

      </div>
    </>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          Digital Life Lessons
        </Link>
      </div>

      <div className="flex-none gap-3">
        <NavLink to="/" className="btn btn-ghost">
          Home
        </NavLink>
        <NavLink to="/public-lessons" className="btn btn-ghost">
          Public Lessons
        </NavLink>

        {user && (
          <>
            <NavLink to="/dashboard/add-lesson" className="btn btn-ghost">
              Add Lesson
            </NavLink>
            <NavLink to="/dashboard/my-lessons" className="btn btn-ghost">
              My Lessons
            </NavLink>
            <NavLink to="/dashboard/upgrade" className="btn btn-ghost">
              Pricing/Upgrade
            </NavLink>
          </>
        )}

        {!user && (
          <>
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline btn-primary">
              Register
            </NavLink>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/150"}
                  alt="User"
                />
              </div>
            </label>
            {isDropdownOpen && (
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <span>{user.displayName || "User"}</span>
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

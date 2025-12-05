import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../assets/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  const activeClass = "btn btn-ghost font-semibold text-blue-600";

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Digital Life Lessons
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : "btn btn-ghost"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/public-lessons"
              className={({ isActive }) =>
                isActive ? activeClass : "btn btn-ghost"
              }
            >
              Public Lessons
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard/add-lesson"
                  className={({ isActive }) =>
                    isActive ? activeClass : "btn btn-ghost"
                  }
                >
                  Add Lesson
                </NavLink>
                <NavLink
                  to="/dashboard/my-lessons"
                  className={({ isActive }) =>
                    isActive ? activeClass : "btn btn-ghost"
                  }
                >
                  My Lessons
                </NavLink>
                <NavLink
                  to="/dashboard/upgrade"
                  className={({ isActive }) =>
                    isActive ? activeClass : "btn btn-ghost"
                  }
                >
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

            {/* User Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/150"}
                      alt="User"
                    />
                  </div>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-md py-2">
                    <li className="px-4 py-2 font-semibold">
                      {user.displayName || "User"}
                    </li>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1">
          <NavLink to="/" className="block btn btn-ghost w-full text-left">
            Home
          </NavLink>
          <NavLink
            to="/public-lessons"
            className="block btn btn-ghost w-full text-left"
          >
            Public Lessons
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/dashboard/add-lesson"
                className="block btn btn-ghost w-full text-left"
              >
                Add Lesson
              </NavLink>
              <NavLink
                to="/dashboard/my-lessons"
                className="block btn btn-ghost w-full text-left"
              >
                My Lessons
              </NavLink>
              <NavLink
                to="/dashboard/upgrade"
                className="block btn btn-ghost w-full text-left"
              >
                Pricing/Upgrade
              </NavLink>
              <button
                onClick={handleLogout}
                className="block btn btn-ghost w-full text-left"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <NavLink
                to="/login"
                className="block btn btn-primary w-full text-left"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block btn btn-outline btn-primary w-full text-left"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

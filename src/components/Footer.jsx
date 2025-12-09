import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Description */}
        <div>
          <h1 className="text-xl font-bold text-white mb-2">
            Digital Life Lessons
          </h1>
          <p className="text-gray-400">
            A platform to create, share, and explore meaningful life lessons.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p>Email: support@digitallife.com</p>
          <p>Phone: +880 1234 567 890</p>
        </div>

        {/* Links & Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              X
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>
          <Link to="/terms" className="block mt-2 hover:text-white">
            Terms & Conditions
          </Link>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6">
        © 2025 Digital Life Lessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

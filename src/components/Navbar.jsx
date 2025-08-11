import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="bg-[#0B192C] w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-bold text-xl cursor-pointer" onClick={() => handleNavigation('/member')}>
            Ministry Schedule
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavigation('/leader')}
              className="bg-white text-[#0B192C] px-4 py-2 rounded hover:bg-gray-200 font-medium transition"
            >
              Add Schedule
            </button>
            <button 
              onClick={() => handleNavigation('/all-schedule')}
              className="bg-white text-[#0B192C] px-4 py-2 rounded hover:bg-gray-200 font-medium transition"
            >
              All Schedule
            </button>
            <button 
              onClick={() => handleNavigation('/login')}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium transition"
            >
              Logout
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B192C] px-2 pt-2 pb-3 space-y-1">
          <button 
            onClick={() => handleNavigation('/leader')}
            className="block w-full text-left bg-white text-[#0B192C] px-4 py-2 rounded hover:bg-gray-200 font-medium transition mb-2"
          >
            Add Schedule
          </button>
          <button 
            onClick={() => handleNavigation('/all-schedule')}
            className="block w-full text-left bg-white text-[#0B192C] px-4 py-2 rounded hover:bg-gray-200 font-medium transition mb-2"
          >
            All Schedule
          </button>
          <button 
            onClick={() => handleNavigation('/login')}
            className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-medium transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

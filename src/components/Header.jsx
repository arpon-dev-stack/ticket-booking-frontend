import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const mobMenu = useRef();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Book Ticket', path: '/book-ticket' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: null },
    { id: 'bookings', name: 'Bookings', icon: null },
    { id: 'buses', name: 'Buses', icon: null },
    { id: 'users', name: 'Users', icon: null },
    { id: 'settings', name: 'Settings', icon: null }
  ];

  const isActive = (path) => location.pathname === path;

  // --- Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the menu is open and if the click was outside the mobMenu ref
      if (isOpen && mobMenu.current && !mobMenu.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach listener
    document.addEventListener('pointerdown', handleClickOutside);

    // Cleanup listener
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when isOpen changes
  // ----------------------------

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <nav className="mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition">
            <Bus size={32} />
            <span>SwiftBus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-blue-200 transition font-medium ${isActive(item.path) ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className=''>
                <NavLink to="/admin" className={({ isActive }) => `${isActive ? 'bg-blue-800 text-yellow-300' : ''} hover:bg-blue-800 hover:text-blue-200 font-medium rounded`}>Admin</NavLink>
              </div>
            ) : (
              <div className=''>
                <NavLink to="/signin" className={({ isActive }) => `${isActive ? 'bg-blue-800 text-yellow-300' : ''} hover:bg-blue-800 rounded hover:text-blue-200 font-medium`}>Sign In</NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t border-blue-500 -ml-4 pt-4 absolute bg-blue-700 w-full shadow-xl"
            ref={mobMenu}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 hover:bg-blue-800 px-4 rounded transition ${isActive(item.path) ? 'bg-blue-800 text-yellow-300' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className='flex flex-col bg-red-100'>
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-blue-800 text-yellow-300' : ''} hover:bg-blue-800 py-2 px-4 rounded`}>Admin</NavLink>
                <button>Sign Out</button>
              </div>
            ) : (
              <div className='flex flex-col'>
                <NavLink to="/signin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-blue-800 text-yellow-300' : ''} hover:bg-blue-800 py-2 px-4 rounded`}>Sign In</NavLink>
                <NavLink to="/signup" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-blue-800 text-yellow-300' : ''} hover:bg-blue-800 py-2 px-4 rounded`}>Sign Up</NavLink>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
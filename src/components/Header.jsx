import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bus, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useSignOutMutation } from '../app/userSlice/userApi';
import { toast } from 'react-toastify';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const mobMenu = useRef();
  const [signOut] = useSignOutMutation()
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector(state => state.user);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Book Ticket', path: '/book-ticket' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSignout = async () => {
    try {
      const response = signOut().unwrap();
      toast.promise(response, {
        pending: 'Sign Out...',
        success: {
          render({ data }) {
            return data.message || 'Successfully Sign Out'
          }
        },
        error: {
          render({ data }) {
            return data.message || 'Failed to Sign Out'
          }
        }
      })
      await response;
      navigate('/');
    } catch (error) {
    }

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && mobMenu.current && !mobMenu.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-emerald-600 text-white sticky top-0 z-50">
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
                className={`hover:text-blue-200 transition font-medium ${isActive(item.path) ? 'border-b-2 pb-1' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className=''>
                <NavLink to="/admin" className={({ isActive }) => `${isActive ? 'border-b-2 pb-1' : ''} hover:text-blue-200 font-medium `}>Admin</NavLink>
              </div>
            ) : (
              <div className=''>
                <NavLink to="/signin" className={({ isActive }) => `${isActive ? 'border-b-2 pb-1' : ''} hover:text-blue-200 font-medium `}>Sign In</NavLink>
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
            className="md:hidden mt-4 pb-4 -ml-4 pt-4 absolute bg-emerald-500 w-full shadow-xl"
            ref={mobMenu}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 hover:bg-emerald-600 px-4 rounded transition ${isActive(item.path) ? 'bg-emerald-500' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className='flex flex-col'>
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-emerald-500' : ''} hover:bg-emerald-600 py-2 px-4 rounded`}>Admin</NavLink>
                <button onClick={handleSignout} className='py-2 px-4 flex justify-start hover:bg-red-700 rounded-lg'>Sign Out</button>
              </div>
            ) : (
              <div className='flex flex-col'>
                <NavLink to="/signin" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-emerald-500' : ''} hover:bg-emerald-600 py-2 px-4 rounded`}>Sign In</NavLink>
                <NavLink to="/signup" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'bg-emerald-500' : ''} hover:bg-emerald-600 py-2 px-4 rounded`}>Sign Up</NavLink>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
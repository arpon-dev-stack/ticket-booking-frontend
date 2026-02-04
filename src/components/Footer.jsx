import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bus size={28} className="text-blue-500" />
              <span className="text-xl font-bold text-white">SwiftBus</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for comfortable and safe bus travel. Book tickets online with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition text-sm">Home</Link>
              </li>
              <li>
                <Link to="/book-ticket" className="hover:text-blue-400 transition text-sm">Book Ticket</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-400 transition text-sm">Admin</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Phone size={16} className="text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail size={16} className="text-blue-500" />
                <span>info@swiftbus.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-blue-500" />
                <span>123 Bus Terminal, City</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Instagram size={24} />
              </a>
            </div>
            <p className="mt-4 text-sm">
              Stay connected for exclusive offers and updates!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SwiftBus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
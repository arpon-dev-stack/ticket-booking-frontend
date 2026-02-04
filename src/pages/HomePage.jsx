import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, DollarSign } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Safe & Secure',
      description: 'Travel with confidence knowing your safety is our priority'
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: 'On-Time Service',
      description: 'Punctual departures and arrivals for your convenience'
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-600" />,
      title: 'Best Prices',
      description: 'Affordable rates with no hidden charges'
    }
  ];
  const divisions = [
  { id: 1, name: "Dhaka", code: "DHA" },
  { id: 6, name: "Sylhet", code: "SYL" },
  { id: 2, name: "Chattogram", code: "CTG" },
  { id: 3, name: "Rajshahi", code: "RAJ" },
  { id: 4, name: "Khulna", code: "KHU" },
  { id: 5, name: "Barishal", code: "BAR" },
  { id: 7, name: "Rangpur", code: "RAN" },
  { id: 8, name: "Mymensingh", code: "MYM" }
];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Book Your Bus Tickets Online
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Fast, easy, and reliable bus booking service. Travel anywhere, anytime with SwiftBus.
            </p>
            <Link
              to="/book-ticket"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-block"
            >
              Book Ticket Now
            </Link>
          </div>
        </div>
      </section>

      <section className='p-2 flex gap-2 flex-wrap bg-gradient-to-r from-blue-600 to-blue-800 border-t'>
        {divisions.map(location => <span key={location.id} className='font-semibold text-blue-900 hover:bg-yellow-300 rounded-lg bg-yellow-400 p-2 text-md'>{location.name}</span>)}
      </section>      
    </div>
  );
};

export default Home;
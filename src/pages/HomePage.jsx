import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, DollarSign, Users, Route, Bus, ChevronDown, ChevronUp } from 'lucide-react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { icon: <Route className="w-8 h-8" />, label: "Active Routes", value: "200+" },
    { icon: <Users className="w-8 h-8" />, label: "Happy Customers", value: "50,000+" },
    { icon: <Bus className="w-8 h-8" />, label: "Daily Trips", value: "150+" },
  ];

  const faqs = [
    {
      question: "How do I cancel my ticket?",
      answer: "You can cancel your ticket through the 'My Bookings' section. Cancellations made 24 hours before departure are eligible for a 90% refund."
    },
    {
      question: "Do I need to print my e-ticket?",
      answer: "No, a digital copy of your ticket on your phone along with a valid ID is sufficient for boarding."
    },
    {
      question: "What happens if the bus is delayed?",
      answer: "We strive for punctuality. In case of significant delays, we will notify you via SMS and provide alternative arrangements if necessary."
    },
    {
      question: "Can I choose my preferred seat?",
      answer: "Yes! Our real-time seat map allows you to pick your favorite seat, including window or aisle options, at no extra cost."
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Book Your Bus Tickets Online</h1>
            <p className="text-xl mb-8 text-blue-100">
              Fast, easy, and reliable bus booking service. Travel anywhere, anytime with SwiftBus.
            </p>
            <Link to="/book-ticket" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-block">
              Book Ticket Now
            </Link>
          </div>
        </div>
      </section>

      {/* Division Quick Links */}
      <section className='p-2 flex gap-2 flex-wrap bg-gradient-to-r from-blue-600 to-blue-800 border-t'>
        {divisions.map(location => (
          <span key={location.id} className='font-semibold text-blue-900 hover:bg-yellow-300 rounded-lg bg-yellow-400 p-2 text-md cursor-pointer transition'>
            {location.name}
          </span>
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white duration-700 hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-700">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {/* Accordion Content */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    openFaq === index ? 'max-h-40 border-t bg-gray-50' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-900 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="mb-6 opacity-80">Join thousands of travelers who trust SwiftBus daily.</p>
        <Link to="/signup" className="border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-900 transition">
          Create an Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
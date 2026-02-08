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
    <div className=" bg-[#f9fafb]">
      {/* Hero Section */}
      <section className="text-slate-500 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 text-emerald-600">Book Your Bus Tickets Online</h1>
            <p className="text-xl mb-8 text-emerald-600">
              Fast, easy, and reliable bus booking service. Travel anywhere, anytime with SwiftBus.
            </p>
            <Link to="/book-ticket" className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-600 transition inline-block">
              Book Ticket Now
            </Link>
          </div>
        </div>
      </section>

      {/* Division Quick Links */}
      <section className='p-2 flex gap-2 flex-wrap bg-gradient-to-r'>
        {divisions.map(location => (
          <Link to='/book-ticket' key={location.id} className='font-semibold text-white hover:bg-emrald-400 rounded-lg bg-emerald-500 hover:bg-emerald-600 p-2 text-md cursor-pointer transition'>
            {location.name}
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className="p-4">
        <div className="mx-auto">
          <div className="grid grid-cols-[auto] grid-flow-row sm:grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-2xl w-full shadow-sm bg-emerald-600 text-center hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-white font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-8 mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center bg-emerald-500 justify-between p-5 text-white text-left duration-700 hover:bg-emerald-600 transition"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
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
      <section className="text-emerald-600 bg-transparent py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="mb-6 opacity-80">Join thousands of travelers who trust SwiftBus daily.</p>
        <Link to="/signup" className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition">
          Create an Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
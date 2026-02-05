import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, Bus, MapPin } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {bus} = location.state || {};

  console.log(bus);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600 mb-4">No booking data found</p>
          <button
            onClick={() => navigate('/book-ticket')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Booking Page
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Your ticket has been booked successfully</p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Booking Details</h3>
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Bus:</strong> {bus.bus.name}</p>
                <p className="text-gray-700"><strong>Seats:</strong> {bus.seats.join(', ')}</p>
                <p className="text-gray-700"><strong>Departure:</strong> {bus.bus.departure}</p>
                <p className="text-gray-700"><strong>Booking ID:</strong> BKG{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-xl font-bold text-blue-600 mt-4">
                  Total Paid: ${bus.totalAmount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Download Ticket
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Complete Your Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 pb-4 border-b">
                  <Bus className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">{bus.name}</h3>
                    <p className="text-sm text-gray-600">{bus.type}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Departure Time</p>
                  <p className="font-semibold text-gray-800">{bus.departure}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Selected Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {bus.bookedSeats.map(seat => (
                      <span key={seat} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Ticket Price</span>
                    <span className="font-semibold">${bus.price} x {bus.bookedSeats.length}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">$2</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">${(bus.price * bus.bookedSeats.length) + 2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                <Lock className="text-green-600" size={24} />
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition ${
                      paymentMethod === 'card' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <CreditCard className="mx-auto mb-2 text-blue-600" size={24} />
                    <p className="text-sm font-medium">Card</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border-2 rounded-lg transition ${
                      paymentMethod === 'upi' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded-full"></div>
                    <p className="text-sm font-medium">UPI</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-4 border-2 rounded-lg transition ${
                      paymentMethod === 'wallet' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded"></div>
                    <p className="text-sm font-medium">Wallet</p>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input autoComplete='on'
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input autoComplete='on'
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input autoComplete='on'
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input autoComplete='on'
                          type="text"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                      <p className="text-sm text-yellow-800">
                        <Lock className="inline mr-2" size={16} />
                        Your payment information is encrypted and secure
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg mt-6"
                    >
                      Pay ${(bus.price * bus.bookedSeats.length) + 2}
                    </button>
                  </div>
                </form>
              )}

              {/* UPI Payment */}
              {paymentMethod === 'upi' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Enter your UPI ID</p>
                  <input autoComplete='on'
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  />
                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
                  >
                    Pay ${(bus.price * bus.bookedSeats.length) + 2}
                  </button>
                </div>
              )}

              {/* Wallet Payment */}
              {paymentMethod === 'wallet' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Select your wallet</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 transition">
                      PayPal
                    </button>
                    <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 transition">
                      Google Pay
                    </button>
                  </div>
                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
                  >
                    Pay ${(bus.price * bus.bookedSeats.length) + 2}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
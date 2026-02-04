import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import BookTicket from './pages/BookingPage';
import Contact from './pages/ContactPage';
import Payment from './pages/PaymentPage';
import AdminDashboard from './pages/Dashboard';
import SeatSelection from './pages/SeatSelection'
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ticket" element={<BookTicket />} />
            <Route path="/select-seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signUp" element={<SignUp/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
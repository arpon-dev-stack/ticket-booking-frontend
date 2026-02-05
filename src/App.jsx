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
import { useVerifyMutation } from './app/userSlice/userApi';
import { useEffect } from 'react';

function App() {
  const token = localStorage.getItem('token')
  const user = useSelector(state => state.user);

  console.log(user)

  const [verify, { isSuccess, isError, isLoading }] = useVerifyMutation();

  const verifyMe = async () => {
    const response = await verify({ token })
    console.log(response);
  }

  useEffect(() => {
    if (token) {
      verifyMe()
    }
  }, [token, verify])


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ticket" element={<BookTicket />} />
            <Route path="/select-seats" element={<ProtectedRoute success={isSuccess} error={isError} loading={isLoading}><SeatSelection /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<ProtectedRoute success={isSuccess} error={isError} loading={isLoading}><Payment /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute success={isSuccess} error={isError} loading={isLoading}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
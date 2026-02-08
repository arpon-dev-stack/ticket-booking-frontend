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
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const token = localStorage.getItem('token');
  const {isAuthenticated} = useSelector(state => state.user);
  const [verify, { isSuccess, isError, isLoading }] = useVerifyMutation();

  // Track if we have attempted to verify the existing token
  const [isVerifyingInitialToken, setIsVerifyingInitialToken] = useState(!!token);

  useEffect(() => {
    const checkToken = async () => {
      if (token && !isAuthenticated) {
        await verify({ token });
      }
      setIsVerifyingInitialToken(false); // Done checking
    };

    checkToken();
  }, []);

  // Block the entire app UI until the initial token check is done
  if (isVerifyingInitialToken && isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading Application...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ticket" element={<BookTicket />} />
            <Route path="/select-seats" element={
              <ProtectedRoute
                success={isSuccess}
                error={isError}
                loading={token ? isLoading : false} // Only show loading if there's a token to verify
              >
                < SeatSelection />
              </ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={
              <ProtectedRoute
                success={isSuccess}
                error={isError}
                loading={token ? isLoading : false} // Only show loading if there's a token to verify
              >
                <Payment />
              </ProtectedRoute>} />
            <Route path="/admin" element={
              <ProtectedRoute
                success={isSuccess}
                error={isError}
                loading={token ? isLoading : false} // Only show loading if there's a token to verify
              >
                <AdminDashboard />
              </ProtectedRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer 
        position='top-right'
        autoClose={3000}
        theme='colored'
        />
      </div>
    </Router>
  );
}

export default App;
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import BookTicket from './pages/BookingPage';
import Contact from './pages/ContactPage';
import Payment from './pages/PaymentPage';
import AdminDashboard from './pages/Dashboard';
import SeatSelection from './pages/SeatSelection'
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useVerifyMutation } from './app/userSlice/userApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';
import { restartUser } from './app/userSlice/user';

function App() {

  const [verify] = useVerifyMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = verify().unwrap();
          toast.promise(response, {
            pending: 'Verifying...',
            success: {
              render({ data }) {
                return data.message || 'Verification successful'
              }
            },
            error: {
              render({ data }) {
                dispatch(restartUser());
                return data.message || 'Verification failed'
              }
            },
          })

          await response;

        } catch (error) {
          dispatch(restartUser());
          localStorage.removeItem('token');
        }
      }
    }
    verifyUser()
  }, [verify]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-ticket" element={<BookTicket />} />
            <Route path="/select-seats" element={
              <ProtectedRoute
              >
                < SeatSelection />
              </ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={
              <ProtectedRoute
              >
                <Payment />
              </ProtectedRoute>} />
            <Route path="/admin" element={
              <ProtectedRoute
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
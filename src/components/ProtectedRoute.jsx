import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();
    const token = localStorage.getItem('token');

    // If there is a token but Redux isn't updated yet, just wait.
    if (token && !isAuthenticated) {
        return <div className="h-screen flex items-center justify-center">Authenticating...</div>;
    }

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default ProtectedRoute;
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isError, isLoading, children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    if (isLoading || isError || !isAuthenticated) {
        // Redirect to login but save the current location
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    
    return children;
};

export default ProtectedRoute;
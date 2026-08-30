
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Context/AuthContext';
import { FadeLoader } from 'react-spinners';

export function ProtectedRoute({ children, redirectTo = '/login' }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#191b1c]">
                <FadeLoader color="#CB2957" />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate 
                to={redirectTo} 
                state={{ from: location.pathname }} 
                replace 
            />
        );
    }

    // Render children if authenticated
    return children;
}
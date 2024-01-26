import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

export const AdminRoute = () => {
    const { userRole } = useAuth();


    if (userRole !== 'admin') {
        // Redirect non-admin users to a different page (e.g., home page or error page)
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
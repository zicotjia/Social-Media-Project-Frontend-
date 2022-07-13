import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux/hooks';
import { User } from '../models/User';

function ProtectedRoutes() {
  const { user }: { user: User } = useAppSelector((state) => state.currUserReducer);
  const location = useLocation();

  return user == null ? <Navigate to="/login" replace state={{ from: location }} /> : <Outlet />;
}

export default ProtectedRoutes;

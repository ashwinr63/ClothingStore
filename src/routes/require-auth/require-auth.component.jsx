import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

const RequireAuth = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to='/auth' replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

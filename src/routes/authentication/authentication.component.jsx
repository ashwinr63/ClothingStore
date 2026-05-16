import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';

import { AuthenticationContainer, AuthCard } from './authentication.styles.jsx';

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (currentUser) {
    return <Navigate to={from} replace />;
  }

  return (
    <AuthenticationContainer>
      <AuthCard>
        <SignInForm />
      </AuthCard>
      <AuthCard>
        <SignUpForm />
      </AuthCard>
    </AuthenticationContainer>
  );
};

export default Authentication;
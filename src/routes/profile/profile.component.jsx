import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return null;
  }

  const { displayName, email } = currentUser;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {displayName || '(no display name)'}</p>
      <p><strong>Email:</strong> {email}</p>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default Profile;


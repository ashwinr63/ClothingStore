import { Link } from 'react-router-dom';
import { NotFoundContainer, NotFoundCard, Title, Subtitle } from './not-found.styles.jsx';
import Button from '../../components/button/button.component';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <div className="page-container">
        <NotFoundCard>
          <Title>Page not found</Title>
          <Subtitle>We couldn't find what you were looking for.</Subtitle>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </NotFoundCard>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;

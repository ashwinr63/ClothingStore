import React from 'react';
import styled from 'styled-components';

const ErrorBoundaryContainer = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ErrorTitle = styled.h2`
  font-size: 28px;
  color: #ff0000;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
`;

const ResetButton = styled.button`
  padding: 12px 24px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  
  &:hover {
    background-color: #333;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
          </ErrorMessage>
          <ResetButton onClick={this.handleReset}>
            Go to Homepage
          </ResetButton>
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


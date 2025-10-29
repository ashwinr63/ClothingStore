import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0,0,0,0.1);
  border-left-color: black;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
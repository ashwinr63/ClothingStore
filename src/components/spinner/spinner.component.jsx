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
  border: 3px solid var(--color-border);
  border-left-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;

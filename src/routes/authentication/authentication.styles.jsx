import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: min(920px, 100%);
  justify-content: center;
  gap: 2rem;
  margin: 2rem auto;
  padding: 2.5rem;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
`;

export const AuthCard = styled.div`
  flex: 1 1 320px;
  max-width: 400px;
  padding: 0.5rem;
`;

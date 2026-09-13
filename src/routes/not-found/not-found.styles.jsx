import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) 0;
`;

export const NotFoundCard = styled.div`
  text-align: center;
  background: var(--color-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  max-width: 560px;
`;

export const Title = styled.h1`
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--space-2);
`;

export const Subtitle = styled.p`
  color: var(--color-muted);
  margin-bottom: var(--space-6);
`;

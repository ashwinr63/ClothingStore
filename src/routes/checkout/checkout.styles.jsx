import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  width: min(720px, 100%);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
`;

export const CheckoutTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 1.5rem;
  text-align: center;
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--color-border);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.span`
  margin-top: 1.5rem;
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
`;

export const EmptyCartMessage = styled.p`
  margin-top: 2rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
  text-align: center;
`;

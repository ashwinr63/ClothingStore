import styled from 'styled-components';

export const OrdersContainer = styled.div`
  width: min(720px, 100%);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const OrdersTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const OrderCard = styled.div`
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const OrderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  gap: 1rem;
  flex-wrap: wrap;

  strong {
    font-family: var(--font-display);
    font-size: 1.1rem;
  }
`;

export const OrderItemsList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  line-height: 1.6;
`;

export const EmptyOrdersMessage = styled.p`
  color: var(--color-text-muted);
  font-size: 1.05rem;
  padding: 2rem;
  text-align: center;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
`;

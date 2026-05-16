import styled from 'styled-components';

export const CartIconContainer = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(28, 25, 23, 0.05);
  }

  .shopping-icon {
    width: 24px;
    height: 24px;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  top: 6px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: var(--color-accent);
  border-radius: 999px;
  box-shadow: var(--shadow-sm);
`;

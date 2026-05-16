import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 360px;
  position: relative;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);

    img {
      transform: scale(1.04);
    }

    button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 78%;
  overflow: hidden;
  background: #e7e5e4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

export const ProductImageLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 0.85rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
`;

export const Name = styled.span`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Price = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-muted);
`;

export const AddButtonWrap = styled.div`
  position: absolute;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  opacity: 0;
  transition: opacity var(--transition-fast);

  button {
    width: 100%;
    opacity: 1;
    transform: translateY(6px);
    transition: transform var(--transition-fast), opacity var(--transition-fast);
  }

  ${ProductCardContainer}:hover & {
    opacity: 1;

    button {
      transform: translateY(0);
    }
  }
`;

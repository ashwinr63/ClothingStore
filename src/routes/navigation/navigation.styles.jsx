import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0;
  transition: opacity var(--transition-fast);

  .logo {
    height: 36px;
    width: auto;
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const BrandText = styled.span`
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text);
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
`;

export const NavLink = styled(Link)`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);

  &:hover {
    color: var(--color-text);
    background: rgba(28, 25, 23, 0.05);
  }
`;

export const SignOutLink = styled.span`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background var(--transition-fast);

  &:hover {
    color: var(--color-text);
    background: rgba(28, 25, 23, 0.05);
  }
`;

export const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 3vw, 2rem) 3rem;
`;

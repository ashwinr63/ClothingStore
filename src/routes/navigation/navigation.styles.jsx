import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const NavigationContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-elevated);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: 0 var(--space-6);
  backdrop-filter: saturate(180%) blur(8px);
`;

export const NavInner = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0;
  color: var(--color-text);
  
  .logo {
    width: 32px;
    height: 32px;
  }
`

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  
  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--color-elevated);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 180ms ease, transform 180ms ease;
    
    &[data-open='true'] {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
`


export const NavLink = styled(Link)`
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease;
  
  &:hover {
    color: var(--color-accent);
    background-color: rgba(14, 165, 233, 0.08);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 10px;
  }
` 

export const MobileToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-elevated);
  color: var(--color-text);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

export const Main = styled.main`
  width: 100%;
  padding: var(--space-6) 0;
`;

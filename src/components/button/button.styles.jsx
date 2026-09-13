import styled, { keyframes } from 'styled-components';

export const BaseButton = styled.button`
  min-width: 140px;
  width: auto;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  font-size: var(--text-sm);
  background-color: var(--color-accent);
  color: #fff;
  text-transform: none;
  font-family: var(--font-heading);
  font-weight: 600;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 80ms ease;
  
  &:hover {
    background-color: var(--color-accent-600);
    border-color: var(--color-accent-600);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: var(--shadow-sm);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  border-color: #4285f4;
  color: white;
  &:hover {
    background-color: #357ae8;
    border-color: #357ae8;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: var(--color-elevated);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  &:hover {
    background-color: #f3f4f6;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const ButtonSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255,255,255,0.6);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  align-self: center;
`;
import styled from 'styled-components';

export const BaseButton = styled.button`
  min-width: 140px;
  width: auto;
  height: 48px;
  letter-spacing: 0.04em;
  line-height: 48px;
  padding: 0 1.75rem;
  font-size: 0.8rem;
  background-color: var(--color-primary);
  color: #fff;
  text-transform: uppercase;
  font-family: var(--font-body);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-fast), transform var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover {
    background-color: var(--color-accent-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:disabled:hover {
    background-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;

  &:hover {
    background-color: #357ae8;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: var(--color-bg-elevated);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  box-shadow: none;

  &:hover {
    background-color: var(--color-primary);
    color: #fff;
    border-color: var(--color-primary);
  }
`;

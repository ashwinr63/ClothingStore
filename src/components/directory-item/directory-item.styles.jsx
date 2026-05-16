import styled from 'styled-components';

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
`;

export const DirectoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(28, 25, 23, 0.75) 0%,
    rgba(28, 25, 23, 0.2) 50%,
    transparent 100%
  );
  pointer-events: none;
`;

export const DirectoryBody = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;

  h2 {
    font-family: var(--font-display);
    font-weight: 600;
    margin: 0 0 0.35rem;
    font-size: 1.75rem;
    color: #fff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 280px;
  flex: 1 1 auto;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  position: relative;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);

    ${BackgroundImage} {
      transform: scale(1.06);
    }
  }

  &.large {
    height: 420px;
  }

  @media (max-width: 800px) {
    min-width: 100%;
    height: 240px;

    &.large {
      height: 280px;
    }
  }
`;

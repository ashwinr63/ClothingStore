import styled from "styled-components";

export const ProductCardContainer = styled.div ` 
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-3);
  background: var(--color-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  transition: transform 120ms ease, box-shadow 160ms ease, border-color 160ms ease;

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: var(--radius-sm);
  }

  button {
    width: 100%;
    margin-top: var(--space-2);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: rgba(0,0,0,0.06);
  }
`

export const Footer = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-base);
`

export const Name = styled.span `
  display: inline-block;
  flex: 1 1 auto;
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Price = styled.span ` 
  flex: 0 0 auto;
  font-weight: 600;
`
/* .product-card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    img {
        width: 100%;
        height: 95%;
        object-fit: cover;
        margin-bottom: 5px;
    }

    button {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
        display: none;
    }

    &:hover {
        img {
            opacity: 0.8;
        }

        button {
            opacity: 0.85;
            display: flex;
        }
    }

    .footer {
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: space-between;
        font-size: 18px;

        .name {
            width: 90%;
            margin-bottom: 15px;
        }

        .price {
            width: 10%;
        }
    }
} */
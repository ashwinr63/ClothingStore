import styled from "styled-components";

export const CheckoutItemContainer = styled.div ` 
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-3) 0;
  font-size: var(--text-base);
  align-items: center;

`
export const ImageContainer = styled.div ` 

  width: 23%;
  padding-right: var(--space-3);

img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

`

export const BaseSpan = styled.span ` 
  width: 23%;
`

export const Quantity = styled(BaseSpan) `
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-left: var(--space-3);
`
export const Arrow = styled.div ` 
  cursor: pointer; 
  user-select: none;
`

export const Value = styled.span ` 
  margin: 0 10px;
`

export const RemoveButton = styled.div `
  padding-left: 12px;
  cursor: pointer;
  color: var(--color-muted);
  &:hover {
    color: var(--color-text);
  }
 `
/* .checkout-item-container {
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;

    .image-container {
        width: 23%;
        padding-right: 15px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name,
    .quantity,
    .price {
        width: 23%;
    }

    .quantity {
        display: flex;
        padding-left: 20px;

        .left-arrow {
            cursor: pointer;
        }
        .right-arrow {
            cursor: pointer;
        }

        .value {
            margin: 0 10px;
        }
    }

    .remove-button {
        padding-left: 12px;
        cursor: pointer;
    }
} */
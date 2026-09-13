import styled from "styled-components";

export const CheckoutContainer = styled.div ` 
  width: 100%;
  max-width: 960px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: var(--space-8) auto 0;

`

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: var(--space-3) 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);

`

export const HeaderBlock = styled.div ` 
  text-transform: capitalize;
  width: 23%;

&:last-child {
  width: 8%;
}

`

export const Total = styled.span ` 
  margin-top: var(--space-6);
  margin-left: auto;
  font-size: var(--text-3xl);
  font-weight: 600;
`
/* .checkout-container {
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;

    .checkout-header {
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid darkgrey;

        .header-block {
            text-transform: capitalize;
            width: 23%;

            &:last-child {
                width: 8%;
            }
        }
    }

    .total {
        margin-top: 30px;
        margin-left: auto;
        font-size: 36px;
    }
}
 */
import styled from "styled-components";

export const SignInContainer = styled.div ` 
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  padding: var(--space-6);
  background: var(--color-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);

  h2 {
    margin: 0 0 var(--space-2);
    font-family: var(--font-heading);
  }
`
export const ButtonContainer = styled.div ` 
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  margin: var(--space-4) 0 0;
`
/* .sign-in-container {
    display: flex;
    flex-direction: column;
    width: 380px;

h2 {
    margin: 10px 0;
}

.button-container {
    display: flex;
    margin: 20px 10px;
}

} */
import styled from "styled-components";

export const SignUpContainer = styled.div ` 
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

/* .sign-up-container {
    display: flex;
    flex-direction: column;
    width: 380px;


h2 {
    margin: 10px 0;
}

.button-container {
    display: flex;
}
} */
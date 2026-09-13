import styled from "styled-components";

export const AuthenticationContainer = styled.div ` 
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  width: 100%;
  max-width: 1000px;
  justify-content: space-between;
  margin: var(--space-8) auto;
  padding: 0 var(--space-6);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
`

/* .authentication-container {
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;
} */
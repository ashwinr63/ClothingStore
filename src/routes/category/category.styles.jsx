import styled from "styled-components";

export const CategoryContainer = styled.div ` 
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: var(--space-4);

@media (max-width: 1280px) {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 420px) {
  grid-template-columns: 1fr;
}
`

export const CategoryTitle = styled.h2 ` 
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 600;
  letter-spacing: 0.3px;
  margin: var(--space-6) 0 var(--space-4);
  text-align: center;
`
/* .category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 23px;
    row-gap: 45px;
}

.category-title{
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
} */
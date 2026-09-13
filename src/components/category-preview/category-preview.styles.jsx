import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div ` 
display: flex;
flex-direction: column;
gap: var(--space-3);
margin-bottom: var(--space-8);

`

export const Title = styled(Link) `
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 0.2px;
  margin-bottom: var(--space-4);
  cursor: pointer;
  width: max-content;
  border-bottom: 2px solid transparent;
  transition: color 160ms ease, border-color 160ms ease;

  &:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

`

export const Preview = styled.div ` 
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
/* .category-preview-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    .title {
        font-size: 28px;
        margin-bottom: 25px;
        cursor: pointer;
    }

    .preview {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px;
    }
} */
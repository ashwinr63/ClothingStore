import styled, { css } from "styled-components";

const subColor = 'var(--color-muted)';
const mainColor = 'var(--color-text)';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label` 
color: ${subColor};
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 300ms ease all;

        ${({ shrink }) => shrink && shrinkLabelStyles}
`

export const Group = styled.div` 
  position: relative;
  margin: 24px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }

`

export const Input = styled.input` 
  background: var(--color-elevated);
  color: ${mainColor};
  font-size: 16px;
  padding: 14px 12px;
  display: block;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin: 20px 0 0;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(14,165,233,0.2);
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`
/* $sub-color: grey;
$main-color: black;

@mixin shrinkLabel {
    top: -14px;
    font-size: 12px;
    color: $main-color;
}

.group {
    position: relative;
    margin: 45px 0;

    .form-input {
        background: none;
        background-color: white;
        color: $sub-color;
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid $sub-color;
        margin: 25px 0;

        &:focus {
            outline: none;
        }

        &:focus~.form-input-label {
            @include shrinkLabel();
        }
    }

    input[type='password'] {
        letter-spacing: 0.3em;
    }

    .form-input-label {
        color: $sub-color;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 300ms ease all;

        &.shrink {
            @include shrinkLabel();
        }
    }
} */
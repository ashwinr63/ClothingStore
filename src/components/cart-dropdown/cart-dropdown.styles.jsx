import styled from "styled-components";

import {
    BaseButton, 
    GoogleSignInButton,
    InvertedButton,
} from '../button/button.styles'

export const CartDropdownContainer = styled.div `
position: absolute;
width: 320px;
max-width: calc(100vw - 24px);
height: 380px;
display: flex;
flex-direction: column;
padding: var(--space-4);
border: 1px solid var(--color-border);
border-radius: var(--radius-md);
background-color: var(--color-elevated);
box-shadow: var(--shadow-lg);
top: 72px;
right: var(--space-6);
z-index: 50;

${BaseButton}
${GoogleSignInButton}
${InvertedButton}
margin-top: auto;
`

export const EmptyMessage = styled.span `
font-size: var(--text-base);
color: var(--color-muted);
margin: 50px auto;
`

export const CartItems = styled.div `
height: 280px;
display: flex;
flex-direction: column;
overflow: auto;
`

/* .cart-dropdown-container {
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    .empty-message {
        font-size: 18px;
        margin: 50px auto;
    }

    .cart-items {
        height: 240px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }

    button {
        margin-top: auto;
    }
} */
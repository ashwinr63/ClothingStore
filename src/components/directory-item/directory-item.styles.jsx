import styled from "styled-components";

export const BackgroundImage = styled.div ` 
width: 100%;
height: 100%;
background-size: cover;
background-position: center;
transition: transform 600ms cubic-bezier(0.25, 0.45, 0.45, 0.95);
`

export const DirectoryBody = styled.div ` 

height: 90px;
padding: 0 25px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: none;
background-color: rgba(255,255,255,0.9);
backdrop-filter: blur(2px);
opacity: 0;
position: absolute;
bottom: 16px;
left: 16px;
right: 16px;
border-radius: var(--radius-sm);
box-shadow: var(--shadow-sm);

        h2 {
            font-weight: 600;
            margin: 0 6px 0;
            font-size: 20px;
            color: var(--color-text);
        }

        p {
            font-weight: 400;
            font-size: 14px;
            color: var(--color-muted);
        }

`

export const DirectoryItemContainer = styled.div ` 

min-width: 30%;
height: 260px;
flex: 1 1 auto;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid var(--color-border);
border-radius: var(--radius-lg);
margin: 0 7.5px 15px;
overflow: hidden;
background: var(--color-elevated);
box-shadow: var(--shadow-sm);

    &:hover {
        cursor: pointer;

        ${BackgroundImage} {
            transform: scale(1.05);
        }

        ${DirectoryBody}{
            opacity: 1;
        }
    }

    &.large {
        height: 360px;
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }
`

/* .directory-item-container {
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        & .background-image {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }

        & .directory-body{
            opacity: 0.9;
        }
    }

    &.large {
        height: 380px;
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }

    .background-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }

    .directory-body {
        height: 90px;
        padding: 0 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        background-color: white;
        opacity: 0.7;
        position: absolute;

        h2 {
            font-weight: bold;
            margin: 0 6px 0;
            font-size: 22px;
            color: #4a4a4a;
        }

        p {
            font-weight: lighter;
            font-size: 16px;
        }
    }
} */


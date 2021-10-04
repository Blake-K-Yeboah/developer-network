import styled from "styled-components";
import { ITheme } from "../../types";

export const StyledFormContainer = styled.div<{
    theme: ITheme;
    rightPanelActive: boolean;
}>`
    width: 45vw;
    height: 50vh;
    position: relative;
    left: 50%;
    top: 10vh;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.fadedWhite};
    border-radius: 20px;
    backdrop-filter: blur(12px);
    display: grid;
    grid-template-columns: 1fr 1fr;

    &::before {
        content: "";
        width: 50%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        position: absolute;
        top: 0;
        transition: left 0.5s ease-in-out;
        z-index: -1;

        ${({ rightPanelActive }) =>
            rightPanelActive
                ? `
                left: 0;
                border-radius: 20px 0 0 20px;
        `
                : `
                left:50%;
                border-radius: 0px 20px 20px 0
        `}
    }
`;

export const StyledFormTitle = styled.h2`
    font-weight: normal;
    text-align: center;
    text-transform: capitalize;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.lightGray};
    letter-spacing: 2px;
`;

export const StyledFormSubText = styled.p`
    font-weight: 100;
    text-align: center;
    margin: 0.75em 0;
    font-size: 1.25rem;
    color: #a4a4a4;
    letter-spacing: 0.5px;
`;

export const StyledPanel = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledForm = styled.form`
    width: 80%;
    margin: 0.75em 0 1.25em 0%;

    & > input {
        margin: 0 0 2.1em 0;
    }
`;

export const StyledInput = styled.input`
    width: 100%;
    height: 45px;
    background: rgba(0, 0, 0, 0.06);
    border: none;
    border-radius: 5px;
    padding-left: 12px;
    outline: none;
    color: #bbb;

    &:focus {
        box-shadow: 0px 0px 10px #fff;
    }

    &::placeholder {
        color: #a4a4a4;
        font-weight: 300;
        letter-spacing: 0.5px;
        font-family: "Montserrat", sans-serif;
    }
`;

export const StyledInputGroup = styled.div`
    height: 45px;
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 1fr;

    input {
        border-radius: 5px 0 0 5px;
    }

    button {
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        height: 100%;
        color: #fff;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        transition: background 0.2s ease-in-out;

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }

        & > * {
            font-size: 1.5rem;
        }
    }
`;

export const StyledButton = styled.button<{
    theme: ITheme;
    colorScheme: string;
}>`
    padding: 12px 28px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #000;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: "Montserrat", sans-serif;
    background-color: ${(props) =>
        props.colorScheme === "blue"
            ? props.theme.colors.primaryDarkerBlue
            : props.theme.colors.primaryDarkerRed};
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 2em;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

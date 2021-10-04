import { createGlobalStyle } from "styled-components";

// Theme Interface
import { ITheme } from "../../types";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Montserrat', sans-serif;
        background: linear-gradient(135deg, rgba(255,217,217,1) 0%, rgba(203,232,255,1) 100%);
    }

    /* Blue Circle */
    body::after {
        content: '';
        background-color: ${({ theme }: { theme: ITheme }) =>
            theme.colors.primaryBlue};
        width: 200px;
        height: 200px;
        position:absolute;
        border-radius:50%;
        top: 15vh;
        left: 22.5vw;
        z-index: -1;
    }

    /* Red Circle */
    body::before {
        content: '';
        background-color: ${({ theme }: { theme: ITheme }) =>
            theme.colors.primaryRed};
        width: 200px;
        height: 200px;
        position:absolute;
        border-radius:50%;
        bottom: 15vh;
        right: 22.5vw;
    }

    /* Fade Animation */
    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`;

export default GlobalStyle;

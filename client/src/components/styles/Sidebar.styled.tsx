import styled from "styled-components";

// Types
import { ITheme } from "../../types";

export const StyledSidebar = styled.div<{
    theme: ITheme;
}>`
    background-color: ${({ theme }) => theme.colors.fadedWhite};
    height: 100%;
    width: 100%;
    border-radius: 20px;
    z-index: 1;
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const StyledProfilePicContainer = styled.div<{
    theme: ITheme;
}>`
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background: linear-gradient(
        90deg,
        rgba(255, 159, 159, 1) 0%,
        rgba(165, 195, 255, 1) 100%
    );
    opacity: 0.5;

    img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        margin: 5% 0 0 5.5%;
    }
`;

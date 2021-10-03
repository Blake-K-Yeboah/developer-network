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

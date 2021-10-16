import styled from "styled-components";

// Types
import { ITheme } from "../../types";

export const StyledFeedGrid = styled.div<{
    theme: ITheme;
}>`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 60vw;
    margin: 5vh auto 0 auto;
    height: 70vh;
    grid-gap: 3em;

    & > div {
        background-color: ${({ theme }) => theme.colors.fadedWhite};
        height: 100%;
        width: 100%;
        border-radius: 20px;
        z-index: 1;
        backdrop-filter: blur(12px);
    }
`;

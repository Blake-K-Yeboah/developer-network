import styled from "styled-components";
import { ITheme } from "../../types";

export const StyledFooter = styled.footer<{ sticky: boolean }>`
    background: ${({ theme }: { theme: ITheme }) => theme.colors.fadedWhite};
    height: 75px;
    backdrop-filter: blur(12px);
    position: ${(props: any) => (props.sticky ? "absolute" : "relative")};
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: #999;
        font-weight: 300;
        letter-spacing: 1.3px;
        font-size: 0.9rem;
    }
`;

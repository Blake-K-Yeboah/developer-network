import styled from "styled-components";

export const StyledPageHeading = styled.h1`
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    margin-top: 10vh;
    font-size: 2.35rem;
    color: ${({ theme }) => theme.colors.lightGray};
    letter-spacing: 5px;
`;

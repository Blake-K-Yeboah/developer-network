import styled from "styled-components";

export const StyledFormTitle = styled.h2`
    font-weight: normal;
    text-align: center;
    text-transform: capitalize;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.lightGray};
    letter-spacing: 2px;
`;

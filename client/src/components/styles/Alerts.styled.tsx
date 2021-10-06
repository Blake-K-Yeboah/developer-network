import styled from "styled-components";

export const StyledErrorAlert = styled.div`
    width: 100%;
    min-height: 45px;
    background-color: #f88;
    border-radius: 5px;
    margin: 0 0 2em 0;
    line-height: 45px;
    padding: 6px 12px;
    color: #fff;
    font-size: 0.85rem;
    animation: fade 0.5s linear;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
    }

    p {
        max-width: 75%;
        line-height: 2;
    }
`;

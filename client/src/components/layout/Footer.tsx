import { StyledFooter } from "../styles/Footer.styled";

interface IProps {
    sticky: boolean;
}

const Footer = ({ sticky }: IProps) => {
    return (
        <StyledFooter sticky={sticky}>
            <p>&copy; Copyright 2021 Dev Network. All Rights Reserved</p>
        </StyledFooter>
    );
};

export default Footer;

import React from "react";

// Styled Components
import { StyledErrorAlert } from "../styles/Alerts.styled";

// Icons
import { FaTimes } from "react-icons/fa";

interface IProps {
    msg: string;
}

const ErrorAlert: React.FC<IProps> = ({ msg }) => {
    return (
        <StyledErrorAlert>
            <p>{msg}</p>
            <span>
                <FaTimes />
            </span>
        </StyledErrorAlert>
    );
};

export default ErrorAlert;

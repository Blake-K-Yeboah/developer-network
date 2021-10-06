import React from "react";

// Styled Components
import { StyledErrorAlert } from "../styles/Alerts.styled";

// Icons
import { FaTimes } from "react-icons/fa";

interface IProps {
    msg: string;
    setHasError: (hasError: boolean) => void;
}

const ErrorAlert: React.FC<IProps> = ({ msg, setHasError }) => {
    return (
        <StyledErrorAlert>
            <p>{msg}</p>
            <span onClick={() => setHasError(false)}>
                <FaTimes />
            </span>
        </StyledErrorAlert>
    );
};

export default ErrorAlert;

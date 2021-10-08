import React from "react";

// Styled Components
import {
    StyledFormTitle,
    StyledSingleFormContainer,
} from "../../styles/FormContainer.styled";

// Regular Components
import ProgressBar from "./ProgressBar";

// Props Interface
interface IProps {
    step: number;
    setStep: (newStep: number) => void;
}

const MultiStepSignUpForm: React.FC<IProps> = ({ step }) => {
    return (
        <StyledSingleFormContainer>
            <ProgressBar step={step} />
            <StyledFormTitle>Sign Up</StyledFormTitle>
        </StyledSingleFormContainer>
    );
};

export default MultiStepSignUpForm;

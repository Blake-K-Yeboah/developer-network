import React from "react";

// Styled Components
import {
    StyledFormContainer,
    StyledFormSubText,
    StyledFormTitle,
    StyledPanel,
} from "../../styles/FormContainer.styled";

// Regular Components
import SignInForm from "./SignInForm";

interface IProps {
    action: string;
    setAction: React.Dispatch<React.SetStateAction<string>>;
}

const FormContainer: React.FC<IProps> = (props) => {
    const rightPanelActive: boolean = props.action === "sign-up";

    return (
        <StyledFormContainer rightPanelActive={rightPanelActive}>
            <StyledPanel>
                <StyledFormTitle>Sign In</StyledFormTitle>
                <StyledFormSubText>Welcome back developer!</StyledFormSubText>
                <SignInForm />
            </StyledPanel>
            <div></div>
        </StyledFormContainer>
    );
};

export default FormContainer;

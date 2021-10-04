import React, { useState } from "react";

// Styled Components
import {
    StyledButton,
    StyledFormContainer,
    StyledFormSubText,
    StyledFormTitle,
    StyledPanel,
} from "../../styles/FormContainer.styled";

// Regular Components
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface IProps {
    action: string;
    setAction: React.Dispatch<React.SetStateAction<string>>;
}

const FormContainer: React.FC<IProps> = (props) => {
    const [rightPanelActive, setRightPanelActive] = useState<boolean>(
        props.action === "sign-up"
    );

    const [animate, setAnimate] = useState<boolean>(false);

    const handleClick = () => {
        setRightPanelActive(!rightPanelActive);
        setAnimate(true);

        setTimeout(() => setAnimate(false), 750);
    };

    return (
        <StyledFormContainer rightPanelActive={rightPanelActive}>
            <StyledPanel animate={animate}>
                <StyledFormTitle>
                    {rightPanelActive ? "Sign Up" : "Sign In"}
                </StyledFormTitle>
                <StyledFormSubText>
                    {rightPanelActive
                        ? "Welcome to Dev Network!"
                        : "Welcome back developer!"}
                </StyledFormSubText>
                {rightPanelActive ? <SignUpForm /> : <SignInForm />}
            </StyledPanel>
            <StyledPanel animate={animate}>
                <StyledFormTitle>
                    {rightPanelActive ? "Sign In" : "Sign Up"}
                </StyledFormTitle>
                <StyledFormSubText>
                    {rightPanelActive
                        ? "Welcome back to Dev Network! Hit the button below to sign in to your account."
                        : "Dont have an account? Dont worry, sign up to the ultimate social network for developers."}
                </StyledFormSubText>
                <StyledButton
                    colorScheme={rightPanelActive ? "blue" : "red"}
                    notCenter
                    onClick={handleClick}
                >
                    {rightPanelActive ? "Sign In" : "Sign Up"}
                </StyledButton>
            </StyledPanel>
        </StyledFormContainer>
    );
};

export default FormContainer;

import React from "react";

// Styled Components
import {
    StyledFormContainer,
    StyledFormTitle,
} from "../../styles/FormContainer.styled";

interface IProps {
    action: string;
    setAction: React.Dispatch<React.SetStateAction<string>>;
}

const FormContainer = (props: IProps) => {
    const rightPanelActive: boolean = props.action === "sign-up";

    return (
        <StyledFormContainer rightPanelActive={rightPanelActive}>
            <div>
                <StyledFormTitle>Sign In</StyledFormTitle>
            </div>
            <div></div>
        </StyledFormContainer>
    );
};

export default FormContainer;

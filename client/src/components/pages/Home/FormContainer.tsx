import React from "react";

// Styled Components
import { StyledFormContainer } from "../../styles/FormContainer.styled";
import { StyledFormTitle } from "../../styles/FormTitle.styled";

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

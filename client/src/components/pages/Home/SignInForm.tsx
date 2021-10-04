import {
    StyledForm,
    StyledInput,
    StyledInputGroup,
    StyledButton,
} from "../../styles/FormContainer.styled";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";

const SignInForm = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleBtnClick = () => {
        setShow(!show);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            <StyledInput placeholder="Email: " />
            <StyledInputGroup>
                <StyledInput
                    placeholder="Password: "
                    type={show ? "text" : "password"}
                />
                <button onClick={handleBtnClick}>
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
            </StyledInputGroup>
            <StyledButton colorScheme="blue">Sign In</StyledButton>
        </StyledForm>
    );
};

export default SignInForm;

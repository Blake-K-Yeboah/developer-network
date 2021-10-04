// Styled Components
import {
    StyledForm,
    StyledInput,
    StyledInputGroup,
    StyledButton,
} from "../../styles/FormContainer.styled";

// Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// React and useState hook
import React, { useState } from "react";

// User Input Interface
interface IUserInput {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [show, setShow] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<IUserInput>({
        email: "",
        password: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const handleBtnClick = () => {
        setShow(!show);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            <StyledInput
                placeholder="Email: "
                value={userInput.email}
                type="email"
                id="email"
                onChange={onChange}
            />
            <StyledInputGroup>
                <StyledInput
                    placeholder="Password: "
                    type={show ? "text" : "password"}
                    value={userInput.password}
                    id="password"
                    onChange={onChange}
                />
                <button onClick={handleBtnClick}>
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
            </StyledInputGroup>
            <StyledButton colorScheme="blue" type="submit">
                Sign In
            </StyledButton>
        </StyledForm>
    );
};

export default SignInForm;

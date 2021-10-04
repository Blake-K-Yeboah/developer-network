// Styled Components
import {
    StyledForm,
    StyledInput,
    StyledButton,
} from "../../styles/FormContainer.styled";

// React and useState hook
import React, { useState } from "react";

// User Input Interface
interface IUserInput {
    name: string;
    email: string;
}

const SignUpForm = () => {
    const [userInput, setUserInput] = useState<IUserInput>({
        name: "",
        email: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            <StyledInput
                placeholder="Name: "
                value={userInput.name}
                id="name"
                onChange={onChange}
            />
            <StyledInput
                placeholder="Email: "
                type="email"
                value={userInput.email}
                id="email"
                onChange={onChange}
            />
            <StyledButton colorScheme="red" type="submit">
                Continue
            </StyledButton>
        </StyledForm>
    );
};

export default SignUpForm;

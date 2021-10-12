// Styled Components
import {
    StyledForm,
    StyledInput,
    StyledButton,
} from "../../styles/FormContainer.styled";

// React and useState hook
import React, { useState } from "react";

// Components
import ErrorAlert from "../../Alerts/ErrorAlert";

// hooks
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

// Actions
import { setSignUpInput } from "../../../slices/authSlice";

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
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // History
    let history = useHistory();

    // Dispatch
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userInput.name) {
            setHasError(true);
            setError("Please enter your name.");
            return;
        }

        if (!userInput.email) {
            setHasError(true);
            setError("Please enter your email.");
            return;
        }

        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(String(userInput.email).toLowerCase())) {
            setHasError(true);
            setError("Invalid email");
            return;
        }

        // Store userInput in state
        dispatch(setSignUpInput(userInput));

        // Redirect to sigh up page
        history.push("/sign-up?step=2");
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            {hasError ? (
                <ErrorAlert msg={error} setHasError={setHasError} />
            ) : (
                ""
            )}
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

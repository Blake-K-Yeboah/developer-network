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
import ErrorAlert from "../../Alerts/ErrorAlert";

// Axios
import axios from "axios";

// useDispatch Hook
import { useDispatch } from "react-redux";

// Set User Action
import { setUser } from "../../../slices/authSlice";

// useHistory Hook
import { useHistory } from "react-router";

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
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const handleBtnClick = () => {
        setShow(!show);
    };

    // Redux Dispatch
    const dispatch = useDispatch();

    // History
    let history = useHistory();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Make POST Request
        try {
            const res = await axios.post("/api/auth/login", userInput);
            dispatch(setUser(res.data.token));
            localStorage.setItem("token", res.data.token);
            history.push("/feed");
        } catch (error: any) {
            setHasError(true);
            setError(error.response.data.msg);
        }
    };

    return (
        <StyledForm onSubmit={handleFormSubmit}>
            {hasError ? (
                <ErrorAlert msg={error} setHasError={setHasError} />
            ) : (
                ""
            )}
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

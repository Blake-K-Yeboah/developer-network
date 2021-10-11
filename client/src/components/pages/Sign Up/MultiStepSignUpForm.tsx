import React, { useEffect, useState } from "react";

// Styled Components
import {
    StyledButton,
    StyledButtonGroup,
    StyledForm,
    StyledFormTitle,
    StyledInput,
    StyledInputLabel,
    StyledOverviewLine,
    StyledSingleFormContainer,
    StyledSpacer,
} from "../../styles/FormContainer.styled";

// Regular Components
import ProgressBar from "./ProgressBar";

// Props Interface
interface IProps {
    step: number;
    setStep: (newStep: number) => void;
}

// User Input Interface
interface IUserInput {
    name: string;
    email: string;
    username: string;
    bio: string;
    password: string;
}

const MultiStepSignUpForm: React.FC<IProps> = ({ step, setStep }) => {
    const userInputFromLocal = localStorage.getItem("userInput")
        ? // @ts-ignore
          JSON.parse(localStorage.getItem("userInput"))
        : {};

    const [userInput, setUserInput] = useState<IUserInput>({
        name: "",
        email: "",
        username: "",
        bio: "",
        password: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        Object.keys(userInput).forEach((key) => {
            if (key in userInputFromLocal) {
                setUserInput({
                    ...userInput,
                    [key]: userInputFromLocal.key,
                });
            }
        });
        // eslint-disable-next-line
    }, []);

    const continueBtnHandler = () => {
        setStep(step + 1);
    };

    const goBackBtnHandler = () => {
        setStep(step - 1);
    };

    return (
        <StyledSingleFormContainer>
            <ProgressBar step={step} />
            <StyledFormTitle>Sign Up</StyledFormTitle>
            <StyledForm>
                {step === 1 ? (
                    <>
                        <StyledInputLabel>What is your name?</StyledInputLabel>
                        <StyledInput
                            placeholder="Name: "
                            value={userInput.name}
                            id="name"
                            onChange={onChange}
                        />

                        <StyledInputLabel>What is your email?</StyledInputLabel>
                        <StyledInput
                            placeholder="Email: "
                            type="email"
                            value={userInput.email}
                            id="email"
                            onChange={onChange}
                        />
                    </>
                ) : step === 2 ? (
                    <>
                        <StyledInputLabel>
                            What username would you like?
                        </StyledInputLabel>
                        <StyledInput
                            placeholder="Username: "
                            value={userInput.username}
                            id="username"
                            onChange={onChange}
                        />

                        <StyledInputLabel>
                            What bio would you like?
                        </StyledInputLabel>
                        <StyledInput
                            placeholder="Bio: "
                            value={userInput.bio}
                            id="bio"
                            onChange={onChange}
                        />
                    </>
                ) : step === 3 ? (
                    <>
                        <StyledInputLabel>
                            What password would you like?
                        </StyledInputLabel>
                        <StyledInput
                            placeholder="Password: "
                            type="password"
                            value={userInput.password}
                            id="password"
                            onChange={onChange}
                        />
                        <StyledSpacer />
                    </>
                ) : (
                    <>
                        <StyledOverviewLine>
                            <span>Name: </span>{" "}
                            {userInput.name ? userInput.name : <em>Missing</em>}
                        </StyledOverviewLine>
                        <StyledOverviewLine>
                            <span>Email: </span>{" "}
                            {userInput.email ? (
                                userInput.email
                            ) : (
                                <em>Missing</em>
                            )}
                        </StyledOverviewLine>
                        <StyledOverviewLine>
                            <span>Username: </span>{" "}
                            {userInput.username ? (
                                `@${userInput.username}`
                            ) : (
                                <em>Missing</em>
                            )}
                        </StyledOverviewLine>
                        <StyledOverviewLine>
                            <span>Bio: </span>{" "}
                            {userInput.bio ? userInput.bio : <em>Missing</em>}
                        </StyledOverviewLine>
                        <StyledOverviewLine>
                            <span>Password: </span>{" "}
                            {userInput.password ? "(Hidden)" : <em>Missing</em>}
                        </StyledOverviewLine>
                    </>
                )}
            </StyledForm>
            <StyledButtonGroup>
                <StyledButton
                    colorScheme="red"
                    notCenter
                    disabled={step === 1}
                    onClick={goBackBtnHandler}
                >
                    Go Back
                </StyledButton>
                <StyledButton
                    colorScheme="blue"
                    notCenter
                    onClick={continueBtnHandler}
                >
                    {step === 3
                        ? "Overview"
                        : step === 4
                        ? "Sign Up"
                        : "Continue"}
                </StyledButton>
            </StyledButtonGroup>
        </StyledSingleFormContainer>
    );
};

export default MultiStepSignUpForm;

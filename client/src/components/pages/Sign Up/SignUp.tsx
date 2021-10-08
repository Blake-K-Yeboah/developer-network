import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps } from "react-router";

// Components
import PageHeading from "../../layout/PageHeading";
import MultiStepSignUpForm from "./MultiStepSignUpForm";

const SignUp: React.FC<RouteComponentProps> = (props) => {
    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        if (props.location.search.includes("step")) {
            setStep(parseInt(props.location.search.split("=")[1]));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Helmet>
                <title>Developer Network - Sign Up</title>
            </Helmet>
            <PageHeading />
            <MultiStepSignUpForm step={step} setStep={setStep} />
        </>
    );
};

export default SignUp;

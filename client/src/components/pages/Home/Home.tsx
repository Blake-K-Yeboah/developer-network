import { useState } from "react";
import { Helmet } from "react-helmet";

// Components
import PageHeading from "../../layout/PageHeading";
import Footer from "../../layout/Footer";
import FormContainer from "./FormContainer";

const Home = (props: any) => {
    const [action, setAction] = useState<string>("sign-in");

    return (
        <>
            <Helmet>
                <title>Developer Network - Home</title>
            </Helmet>
            <PageHeading />
            <FormContainer action={action} setAction={setAction} />
            <Footer sticky={true} />
        </>
    );
};

export default Home;

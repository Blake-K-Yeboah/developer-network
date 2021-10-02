import { useState } from "react";
import { Helmet } from "react-helmet";

// Components
import PageHeading from "../../layout/PageHeading";

const Home = (props: any) => {
    const [action, setAction] = useState<string>("Sign In");

    return (
        <>
            <Helmet>
                <title>Developer Network - {action}</title>
            </Helmet>
            <PageHeading />
        </>
    );
};

export default Home;

import { Helmet } from "react-helmet";

// Components
import PageHeading from "../../layout/PageHeading";
import FeedGrid from "./FeedGrid";

const Feed = (props: any) => {
    return (
        <>
            <Helmet>
                <title>Developer Network - Feed</title>
            </Helmet>
            <PageHeading />
            <FeedGrid />
        </>
    );
};

export default Feed;

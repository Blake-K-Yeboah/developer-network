// Styled Components
import { StyledFeedGrid } from "../../styles/Feed.styled";

// Components
import Sidebar from "../../layout/Sidebar";

const FeedGrid = () => {
    return (
        <StyledFeedGrid>
            <Sidebar />
            <div></div>
        </StyledFeedGrid>
    );
};

export default FeedGrid;

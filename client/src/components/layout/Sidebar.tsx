import {
    StyledProfilePicContainer,
    StyledSidebar,
} from "../styles/Sidebar.styled";

// Redux Hooks
import { useSelector } from "react-redux";

// Types
import { RootState } from "../../store";

const Sidebar = () => {
    const profilePicture = useSelector(
        (state: RootState) => state.auth.user?.profilePicture
    );

    return (
        <StyledSidebar>
            <StyledProfilePicContainer>
                <img
                    src={`${process.env.PUBLIC_URL}/uploads/profile/${profilePicture}`}
                    alt="Profile Icon"
                />
            </StyledProfilePicContainer>
        </StyledSidebar>
    );
};

export default Sidebar;

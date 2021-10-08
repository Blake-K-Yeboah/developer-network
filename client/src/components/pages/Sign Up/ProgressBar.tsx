import React from "react";

// Styled Components
import { StyledProgressBar } from "../../styles/FormContainer.styled";

// Props Interface
interface IProps {
    step: number;
}

const ProgressBar: React.FC<IProps> = ({ step }) => {
    const width = `${(step / 4) * 100}%`;

    return <StyledProgressBar width={width} />;
};

export default ProgressBar;

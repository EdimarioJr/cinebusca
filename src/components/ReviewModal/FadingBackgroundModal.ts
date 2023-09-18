import { styled } from "styled-components";
import { BaseModalBackground } from "styled-react-modal";

export const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

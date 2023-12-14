import styled from "styled-components";
import { media } from "@/theme/breakpoints";

type Props = {
  text: string;
  onClick?: () => void;
  size: "small" | "large";
};

const StyledButton = styled.button<{ size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 66px;
  min-height: 27px;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.primary};
  background-color: transparent;
  font-size: 19px;

  ${media.sm} {
    cursor: pointer;
  }
`;

const ButtonText = ({ size, text, onClick }: Props) => {
  return (
    <StyledButton
      size={size}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default ButtonText;

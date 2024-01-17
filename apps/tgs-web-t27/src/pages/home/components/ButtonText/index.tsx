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
  min-width: 44px;
  min-height: 22px;
  padding: 6px 10px;
  border: none;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.g3};
  font-size: 19px;
  border-radius: 4px;

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

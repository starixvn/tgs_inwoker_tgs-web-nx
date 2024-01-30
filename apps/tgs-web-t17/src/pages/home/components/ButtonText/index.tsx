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
  padding: 12px 15px;
  border: none;
  color:#89909A;
  background-color: ${({ theme }) => theme.darkGray};
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;

  ${media.sm} {
    cursor: pointer;
    min-width: 120px;
    min-height: 44px;
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

import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import rightIcon from "@/assets/t32/images/home/right.svg";

type Props = {
  text: string;
  onClick?: () => void;
  size: "small" | "large";
};

const StyledButton = styled.button<{ size: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  min-width: 30px;
  padding: 10px 12px;
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.primary};
  background-color:${({ theme }) => theme.white};
  font-size: 12px;
  font-weight: 500;
  gap: 4px;
  border: 1.5px solid ${({ theme }) => theme.primary};

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
      <img src={rightIcon} alt="see all" />
    </StyledButton>
  );
};

export default ButtonText;

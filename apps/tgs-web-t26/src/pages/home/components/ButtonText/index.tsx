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
  min-width: 100px;
  min-height: 44px;
  padding: 6px 10px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.theme.darkGray};
  color: #828282;
  font-size: 18px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;

  ${media.sm} {
    cursor: pointer;
  }
`;

const ButtonText = ({ size, text, onClick }: Props) => {
  return (
    <StyledButton size={size} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default ButtonText;

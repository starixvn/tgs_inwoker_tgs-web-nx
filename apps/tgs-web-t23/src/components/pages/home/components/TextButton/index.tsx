import { media } from "@/theme/breakpoints";
import styled from "styled-components";

type Props = {
  text: string;
  onClick?: () => void;
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 36px;
  padding: 10px 6px;
  border: none;
  border-radius: 20px;
  background: ${(props) => props.theme.primaryMix};
  color: ${(props) => props.theme.mainDarkBackground};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 0.9375rem;
  line-height: 100%; 
  font-weight:700;
  
  ${media.sm} {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const TextButton = ({ text, onClick }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default TextButton;

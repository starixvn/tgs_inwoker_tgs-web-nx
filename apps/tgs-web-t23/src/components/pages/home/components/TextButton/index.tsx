import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

type Props = {
  text: string;
  onClick?: () => void;
  width?: string | "76px";
  height?: string | "36px";
  bgColor?: string | typeof theme.primaryMix;
  color?: string | typeof theme.mainDarkBackground;
};

const StyledButton = styled.button<{ $width?: string, $height?: string, $bgColor?: string, $color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 10px 6px;
  border: none;
  border-radius: 20px;
  background: ${({ $bgColor }) => $bgColor};
  color:${({ $color }) => $color};
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

const TextButton = ({ text, onClick, width, height, bgColor, color }: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      $width={width}
      $height={height}
      $bgColor={bgColor}
      $color={color}
    >
      {text}
    </StyledButton>
  );
};

export default TextButton;

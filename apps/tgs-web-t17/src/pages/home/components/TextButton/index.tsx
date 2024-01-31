import styled from "styled-components";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

type Props = {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
};

const StyledButton = styled.button<{
  $width?: string;
  $height?: string;
  $bgColor?: string;
  $color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 0px 19.45px;
  border: none;
  border-radius: 4px;
  background: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: 13.6px;
  line-height: 100%;
  font-weight: 400;

  ${media.sm} {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const TextButton = ({
  text,
  onClick,
  width = "100%",
  height = "46px",
  bgColor = theme.primaryGradient,
  color = theme.white,
}: Props) => {
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

import styled from "styled-components";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import play from "@/assets/t24/images/home/play.svg";

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
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 0.9375rem;
  line-height: 100%;
  font-weight: 700;

  > img {
    margin-right: 10px;
  }

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
  width = "91px",
  height = "30px",
  bgColor = theme.primary,
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
      <img src={play} alt="play" />
      {text}
    </StyledButton>
  );
};

export default TextButton;

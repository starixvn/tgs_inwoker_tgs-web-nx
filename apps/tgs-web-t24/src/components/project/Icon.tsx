import React from "react";
import styled from "styled-components";

type IconContainerProps = {
  $width: string;
  $height: string;
};

const IconContainer = styled.div<IconContainerProps>`
  width: ${({ $width }: IconContainerProps) => $width};
  height: ${({ $height }: IconContainerProps) => $height};
  flex-shrink: 0;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
`;

type Props = {
  iconUrl: string;
  width: string;
  height: string;
  onClick?: () => void;
} & React.HTMLProps<HTMLDivElement>;

const Icon: React.FC<Props> = ({ iconUrl, onClick, width, height, ...others }: Props) => {
  return (
    <IconContainer {...others} onClick={onClick} $width={width} $height={height}>
      <img src={iconUrl} alt={"icon"} />
    </IconContainer>
  );
};

export default Icon;

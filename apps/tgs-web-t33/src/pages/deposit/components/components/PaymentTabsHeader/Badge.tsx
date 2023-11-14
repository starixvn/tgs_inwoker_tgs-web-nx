import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  width: calc((100% - 6px * 3) / 4);
  height: fit-content;
  cursor: pointer;
  padding: 13px 8px;
  text-align: center;
  color: white;
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.gradient : theme.gray40};

  font-size: 0.812rem;
  font-weight: 400;
  border-radius: 4px;

  ${media.md} {
    width: auto;
  }
`;

type Props = {
  text: string;
  isActive: boolean;
  handleClick: () => void;
};

const Badge = ({ text, handleClick, isActive }: Props) => {
  return (
    <BadgeContainer onClick={handleClick} $isActive={isActive}>
      {text}
    </BadgeContainer>
  );
};

export default Badge;

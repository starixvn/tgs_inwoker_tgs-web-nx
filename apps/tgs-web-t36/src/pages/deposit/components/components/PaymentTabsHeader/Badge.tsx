import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  height: fit-content;
  cursor: pointer;
  padding: 12px 20px;
  text-align: center;
  border-radius: 3px;
  color: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.white : theme.primary};
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.subNavSec : "#D0DAE3"};
  border: 1px solid
    ${({ $isActive, theme }: BadgeContainerProps) => ($isActive ? "transparent" : theme.subNavSec)};
  font-size: 0.812rem;
  font-weight: 400;
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

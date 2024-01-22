import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  width: calc((100% - 8px * 3) / 4);
  height: fit-content;
  cursor: pointer;
  padding: 12px 20px;
  text-align: center;
  border-radius: 3px;
  color: ${({ $isActive, theme }: BadgeContainerProps) => ($isActive ? theme.white : theme.g2)};
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.green : theme.g3};
  border: 1px solid ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? "transparent" : theme.g4};
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

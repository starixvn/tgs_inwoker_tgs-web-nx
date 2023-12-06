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
  border: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `1px solid ${theme.red}` : `1px solid ${theme.white50}`};

  font-size: 0.75rem;
  font-weight: 400;
  border-radius: 6px;

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

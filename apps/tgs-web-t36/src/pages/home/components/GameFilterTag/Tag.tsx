import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

const Wrapper = styled.div<{
  $isActive: boolean;
  $isShowIcon: boolean;
  $hasBackground: boolean;
}>`
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: none;
  height: 30px;
  margin-right: 4px;
  box-sizing: border-box;
  user-select: none;
  background: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.white)};
  color: ${({ theme, $hasBackground }) => ($hasBackground ? theme.white : theme.grey03)};
  border: ${({ theme, $isActive }) => ($isActive ? `unset` : `1px solid ${theme.grey03}`)};
  min-width: ${({ $isShowIcon }) => ($isShowIcon ? "23px" : "60px")};
  padding: 4px;

  ${media.sm} {
    cursor: pointer;
    background: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.black50)};
    color: ${({ theme, $hasBackground }) => ($hasBackground ? theme.white : theme.white20)};
    padding: 10px;
    border: unset;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.g2)};
  font-size: 0.875rem;
  font-weight: 400;
`;

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

type IconComponentProps = {
  $color: string;
};

const Tag = ({ text, isActive, isShowIcon, children, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $isShowIcon={isShowIcon}
      $hasBackground={!isShowIcon && isActive}
      onClick={onClick}
    >
      {isShowIcon && children}
      {!isShowIcon && <Text $isActive={isActive}>{text}</Text>}
    </Wrapper>
  );
};

export default Tag;

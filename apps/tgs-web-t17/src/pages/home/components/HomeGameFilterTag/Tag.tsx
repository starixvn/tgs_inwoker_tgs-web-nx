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
  background: ${({ theme, $isActive }) =>
    $isActive ? "transparent" : theme.darkGray};
  min-width: 100px;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid ${({ $isActive, theme }) => ($isActive ? theme.secondary : "transparent")};

  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.white};
    }
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.disabledGray)};
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
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default Tag;

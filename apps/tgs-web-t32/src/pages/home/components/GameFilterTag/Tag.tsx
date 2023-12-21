import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

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
  margin-right: 8px;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.primary : theme.white};
  color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.white : theme.primary};
  min-width: ${({ $isShowIcon }) => ($isShowIcon ? "23px" : "60px")};
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.primary};
  padding: 10px 12px;

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
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.primary)};
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.75rem;
`;

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  children: React.ReactNode;
  onClick: () => void;
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

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
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  user-select: none;
  background-color: #222222;
  border-radius: 5px;
  border: ${({ theme, $isActive }) => ($isActive ? `1px solid ${theme.primary}` : "unset")};
  /* ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.white};
    }
  } */
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.text)};
  font-size: 1rem;
  font-weight: 700;
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

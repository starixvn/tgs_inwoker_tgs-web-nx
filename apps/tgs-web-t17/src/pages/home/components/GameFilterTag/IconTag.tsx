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
  min-width: 38px;
  height: 38px;
  margin-right: 4px;
  border-radius: 5px;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.primary : theme.mainBackground};
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
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.white)};
  font-size: 1rem;
  font-weight: 400;
`;

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const IconTag = ({ text, isActive, isShowIcon, children, onClick }: Props) => {
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

export default IconTag;

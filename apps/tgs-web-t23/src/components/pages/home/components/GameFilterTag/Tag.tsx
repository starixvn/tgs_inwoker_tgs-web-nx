import { useRwd } from "@/core/hooks/tools/useRwd";
import { media } from "@/theme/breakpoints";
import React from "react";
import styled from "styled-components";

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
  height: 32px;
  margin-right: 5px;
  border-radius: 20px;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.primary : theme.mainDarkBackground};
  min-width: ${({ $isShowIcon }) =>
    $isShowIcon ? "23px" : "60px"};
  padding: ${({ $isShowIcon }) =>
    $isShowIcon ? "0px" : "4px"};

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
 color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
`;

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  icon: React.ReactElement | null;
  onClick: () => void;
};

const Tag = ({ text, isActive, isShowIcon, icon, onClick }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <Wrapper
      $isActive={isActive}
      $isShowIcon={isShowIcon}
      $hasBackground={!isShowIcon && isActive}
      onClick={onClick}
    >
      {isMobileSize && isShowIcon && icon ? React.cloneElement(icon) : <Text $isActive={isActive}>{text}</Text>}
    </Wrapper>
  );
};

export default Tag;


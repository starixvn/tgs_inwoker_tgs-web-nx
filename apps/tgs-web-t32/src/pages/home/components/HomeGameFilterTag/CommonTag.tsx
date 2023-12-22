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
  height: 100%;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.primary : theme.white};
  color: ${({ theme, $hasBackground }) =>
    $hasBackground ? theme.white : theme.primary};
  min-width: ${({ $isShowIcon }) => ($isShowIcon ? "23px" : "60px")};
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.primary};
  padding: 5px 8px;
  cursor: pointer;
  flex: 0 0 1;
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.primary)};
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.75rem;

  ${media.sm} {
    font-weight: 400;
    margin-right: 4px;
  }
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

const CommonTag = ({ text, isActive, isShowIcon, children, onClick }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type === 'function') {
        const IconComponent = child.type as React.ComponentType<IconComponentProps>;
        return <IconComponent $color={isActive ? theme.white : theme.primary} />;
      }
    }
    return child;
  });

  return (
    <Wrapper
      $isActive={isActive}
      $isShowIcon={isShowIcon}
      $hasBackground={!isShowIcon && isActive}
      onClick={onClick}
    >
      <Text $isActive={isActive}>{text}</Text>
      {cloneChildrenWithProps}
    </Wrapper>
  );
};

export default CommonTag;

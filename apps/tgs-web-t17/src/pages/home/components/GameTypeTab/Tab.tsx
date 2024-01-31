import styled from "styled-components";
import React from "react";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type Props = {
  text: string;
  fontSize: "small" | "smaller" | string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

type IconComponentProps = {
  $color: string;
};

const Wrapper = styled.div<{
  $text: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 77.6px;
  height: 68px;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  gap: 5px;

  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? "rgba(244, 189, 41, 1)" : theme.white)};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const Tab = ({ text, isActive, onClick, children }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type === 'function') {
        const IconComponent = child.type as React.ComponentType<IconComponentProps>;
        return <IconComponent $color={isActive ? "rgba(244, 189, 41, 1)" : theme.white} />;
      }
    }
    return child;
  });

  return (
    <Wrapper $isActive={isActive} $text={text} onClick={onClick}>
      {cloneChildrenWithProps}
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default Tab;

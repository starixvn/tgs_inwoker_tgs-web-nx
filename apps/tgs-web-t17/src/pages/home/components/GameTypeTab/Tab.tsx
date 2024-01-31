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
  padding: 0px 24px;
  gap: 24px;
  user-select: none;
  border-radius: 4px;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.g3 : "#00000033")};
  height: 44px;
  margin-right: 8px;

  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.g2 : theme.g2)};
  font-size: 15.6px;
  font-weight: 400;
  text-align: center;
`;

const Tab = ({ text, isActive, onClick, children }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type === 'function') {
        const IconComponent = child.type as React.ComponentType<IconComponentProps>;
        return <IconComponent $color={isActive ? theme.primary : theme.gray} />;
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

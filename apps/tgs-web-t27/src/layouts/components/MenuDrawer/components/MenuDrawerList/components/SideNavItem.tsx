import styled from "styled-components";
import React from "react";
import { theme } from "@/theme";

type Props = {
  text: string;
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
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme, $isActive }) => ($isActive ? theme.gray40 : "transparent")};
  padding: 9.87px 10px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.white)};
  font-size: 0.975rem;
  font-weight: 400;
`;

const SideNavItem = ({ children, text, isActive, onClick }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (typeof child.type === 'function') {
        const IconComponent = child.type as React.ComponentType<IconComponentProps>;
        return <IconComponent $color={theme.white} />;
      }
    }
    return child;
  });

  return (
    <Wrapper $isActive={isActive} $text={text} onClick={onClick}>
      {cloneChildrenWithProps}
      {/* <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} /> */}
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default SideNavItem;

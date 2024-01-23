import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { theme } from "@/theme";

const BottomNavContainer = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.lightGray)};
  padding: 15px 0px 10px 0px;
  cursor: pointer;
  flex-shrink: 0;
`;

const NavLabel = styled.h6`
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  margin-top: 5px;
`;

type Props = {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  isActive: boolean;
};

type IconComponentProps = {
  $color: string;
};

const BottomNav = ({ isActive, label, onClick, children }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === 'function') {
      const IconComponent = child.type as React.ComponentType<IconComponentProps>;

      return (
        <IconComponent
          $color={!isActive ? theme.white : (isActive ? theme.primary : theme.lightGray)}
        />
      );
    }
    return child;
  });

  return (
    <BottomNavContainer onClick={onClick} $isActive={isActive}>
      {cloneChildrenWithProps}
      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;

import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { NavTypeEnum } from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import { theme } from "@/theme";

const BottomNavContainer = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.BTN02)};
  padding: 9.969px 8.55px 11.02px 8.56px;
  cursor: pointer;
  gap: 1.446px;
  flex-shrink: 0;
`;

const NavLabel = styled.h6`
  font-size: 9.6px;
  font-weight: 600;
  white-space: nowrap;
  margin-top: 3px;
`;

type Props = {
  navType: NavTypeEnum;
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  isActive: boolean;
};

type IconComponentProps = {
  $color: string;
};

const BottomNav = ({ isActive, navType, label, onClick, children }: Props) => {
  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === "function") {
      const IconComponent = child.type as React.ComponentType<IconComponentProps>;
      return <IconComponent $color={isActive ? theme.white : theme.BTN02} />;
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

import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { BottomNavItem } from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import { theme } from "@/theme";

const BottomNavContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6<{ $isSelected: boolean }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.secondary : `#AAAAAA`)};
  margin-top: 5px;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
};

const BottomNav = ({ bottomNavItem, onClick, isSelected }: Props) => {
  const { label } = bottomNavItem;
  return (
    <BottomNavContainer onClick={onClick}>
      <bottomNavItem.icon $color={isSelected ? theme.secondary : `#AAAAAA`} />
      <NavLabel $isSelected={isSelected}>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;

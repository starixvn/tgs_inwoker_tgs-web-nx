import React from "react";
import styled from "styled-components";
import BottomNav from "./BottomNav";
import { BottomNavItem, useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.primaryGradient};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
`;

const BottomAppBar = () => {
  const { bottomNavItemList, selectedBottomNavItem } = useGetBottomNavItemList();

  const handleNavItemClick = (bottomNavItem: BottomNavItem) => {
    bottomNavItem.handleClick();
  };

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        const { key, label, navType, iconComponent } = bottomNavItem;

        return (
          <BottomNav
            key={key}
            label={label}
            navType={navType}
            isActive={selectedBottomNavItem?.label === bottomNavItem.label}
            onClick={() => handleNavItemClick(bottomNavItem)}
          >
            {iconComponent && React.createElement(iconComponent)}
          </BottomNav>
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;

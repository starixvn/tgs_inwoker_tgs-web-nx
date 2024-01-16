import styled from "styled-components";
import BottomNav from "./BottomNav";
import { BottomNavItem, useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import TransferMenuDrawer from "@/layouts/components/TransferMenuDrawer";
import React, { useState } from "react";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background:  ${({ theme }) => theme.g4};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
`;

const BottomAppBar = () => {
  const {
    bottomNavItemList,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  } = useGetBottomNavItemList();
  const [isSelected, setIsSelected] = useState();
  const { activeGameType } = useHomeGameContext();

  const handleNavItemClick = (bottomNavItem: BottomNavItem) => {
    setIsSelected(bottomNavItem.label);
    bottomNavItem.handleClick();
  };

  return (
    <>
      <BottomAppBarContainer>
        {bottomNavItemList.map((bottomNavItem) => {
          const { key, label, navType, iconComponent, gameType } = bottomNavItem;

          return (
            <BottomNav
              key={key}
              label={label}
              navType={navType}
              isActive={gameType === activeGameType && label === isSelected}
              onClick={() => handleNavItemClick(bottomNavItem)}
            >
              {iconComponent && React.createElement(iconComponent)}
            </BottomNav>
          );
        })}
      </BottomAppBarContainer>

      <TransferMenuDrawer
        isOpen={isTransferDrawerOpen}
        handleDrawerToggle={handleTransferDrawerToggle}
      />
    </>
  );
};

export default BottomAppBar;

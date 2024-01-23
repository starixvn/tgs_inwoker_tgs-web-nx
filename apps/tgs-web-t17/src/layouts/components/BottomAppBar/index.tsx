import styled from "styled-components";
import BottomNav from "./BottomNav";
import { BottomNavItem, useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import TransferMenuDrawer from "@/layouts/components/TransferMenuDrawer";
import React, { useState } from "react";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useLocation } from "react-router-dom";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background:  ${({ theme }) => theme.mainBackground};
  border-top: 2px solid ${({ theme }) => theme.primary};
`;

const BottomAppBarInner = styled.div`
  padding: 0 20px;
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

  const handleNavItemClick = (bottomNavItem: BottomNavItem) => {
    bottomNavItem.handleClick();
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  return (
    <>
      <BottomAppBarContainer>
        <BottomAppBarInner>
          {bottomNavItemList.map((bottomNavItem) => {
            const { key, label, iconComponent } = bottomNavItem;
            return (
              <BottomNav
                key={key}
                label={label}
                isActive={bottomNavItem.router === currentRoute}
                onClick={() => handleNavItemClick(bottomNavItem)}
              >
                {iconComponent && React.createElement(iconComponent)}
              </BottomNav>
            );
          })}
        </BottomAppBarInner>
      </BottomAppBarContainer>

      <TransferMenuDrawer
        isOpen={isTransferDrawerOpen}
        handleDrawerToggle={handleTransferDrawerToggle}
      />
    </>
  );
};

export default BottomAppBar;

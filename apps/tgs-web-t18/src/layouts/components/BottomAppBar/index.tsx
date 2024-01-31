import React from "react";
import styled from "styled-components";
import BottomNav from "./BottomNav";
import { useGetBottomNavItemList } from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";

const BottomAppBarContainer = styled.div`
  position: fixed;

  height: ${MOBILE_BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: #181f2b;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
`;

const BottomAppBar = () => {
  const { bottomNavItemList, selectedBottomNavItem, handleClickBottomNavItem } =
    useGetBottomNavItemList();

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClickBottomNavItem(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;

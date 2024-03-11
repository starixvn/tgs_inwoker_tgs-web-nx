import React from "react";
import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import BottomNav from "./BottomNav";
import { RouteCategoryEnum, useGetBottomNavItemList } from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import { BottomNavItem } from "@/layouts/components/BottomAppBar/BottomNav";

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
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const handleClick = (bottomNavItem: BottomNavItem) => {
    if (bottomNavItem.routeCategory === RouteCategoryEnum.HOME) {
      handleChangeGameType(GameTypeEnum.NONE);
    }
    history.push(bottomNavItem.routePath);
  };

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClick(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;

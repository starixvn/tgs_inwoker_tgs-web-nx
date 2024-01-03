import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import React from "react";
import { useAccountNavigations } from "@/hooks/account/useAccountNavigations";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 15px 0px;
  border: 1px solid red;
`;

type Props = {
  isShrink: boolean;
};

const MenuList = ({ isShrink }: Props) => {
  const { sideNavItemList } = useGetNavItemList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const history = useHistory();

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
    handleToggleMenu(false);
  };


  return (
    <TabContainer>
      {sideNavItemList.map((navItem) => {
        const { key, iconComponent, label, gameType } = navItem;

        return (
          <MenuGameTab
            key={key}
            text={isMenuOpen ? label : ""}
            isActive={gameType === activeGameType}
            onClick={() => handleTabClick(navItem)}
          >
            {iconComponent && React.createElement(iconComponent)}
          </MenuGameTab>
        );
      })}
    </TabContainer>
  );
};

export default MenuList;

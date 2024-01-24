import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import MenuGameTab from "./MenuGameTab";
import React, { useState } from "react";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { useRwd } from "@tgs-web-nx/core/hooks";

const TabContainer = styled.div<{
  $isShrink: boolean;
}>`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: 1px solid red;
`;

const MenuList = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { activeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize } = useRwd();
  const isShrink = isDesktopSize && !isMenuOpen;

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
    handleToggleMenu(false);
  };

  return (
    <TabContainer $isShrink={isShrink}>
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

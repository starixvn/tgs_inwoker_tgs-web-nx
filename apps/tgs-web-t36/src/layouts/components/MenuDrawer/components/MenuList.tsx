import React, { useState } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import MenuGameTab from "./MenuGameTab";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const TabContainer = styled.div<{
  $isShrink: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  /* padding: 15px 0px; */
`;

const MenuList = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { activeGameType, setIsEnterGamePortal } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const [isSelected, setIsSelected] = useState();
  const { isDesktopSize } = useRwd();
  const isShrink = isDesktopSize && !isMenuOpen;

  const handleTabClick = (navItem: NavItem) => {
    setIsSelected(navItem.label);
    if (navItem.navType !== "action") return;
    navItem.callback();
    setIsEnterGamePortal(true);
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
            isActive={gameType === activeGameType && label === isSelected}
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

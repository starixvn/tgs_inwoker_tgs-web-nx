import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import SideNavItem from "./SideNavItem";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import LanguageSwitch from "@/components/project/LanguageSwitch";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  border: 1px solid red;
`;

const SideMenuNavList = () => {
  const { sideNavItemList, accountNavItemList } = useGetNavItemList();
  const { activeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
    handleToggleMenu(false);
  };

  return (
    <TabContainer>
      {accountNavItemList.map((navItem) => {
        const { key, iconUrl, label, gameType } = navItem;

        if (navItem.key === NavCardKey.VIP) return null;

        return (
          <SideNavItem
            key={key}
            imageUrl={iconUrl}
            text={isMenuOpen ? label : ""}
            isActive={gameType === activeGameType}
            onClick={() => handleTabClick(navItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default SideMenuNavList;

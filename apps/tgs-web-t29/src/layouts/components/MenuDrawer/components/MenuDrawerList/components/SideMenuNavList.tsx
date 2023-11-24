import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import SideNavItem from "./SideNavItem";
import { NavCardKey, NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const SideMenuNavList = () => {
  const { sideNavItemList } = useGetNavItemList();
  const { activeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
    handleToggleMenu(false);
  };

  return (
    <TabContainer>
      {sideNavItemList.map((navItem) => {
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

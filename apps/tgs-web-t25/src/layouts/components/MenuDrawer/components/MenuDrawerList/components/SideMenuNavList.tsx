import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { useHistory } from "react-router-dom";
import SideNavItem from "./SideNavItem";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import LanguageSwitch from "@/components/project/LanguageSwitch";

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
  const history = useHistory();

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "route") return;
    history.push(navItem.routePath);
    handleToggleMenu(false);
  };

  return (
    <TabContainer>
      {sideNavItemList.map((navItem) => {
        const { key, iconUrl, label } = navItem;

        if (navItem.key === NavCardKey.VIP) return null;

        return (
          <SideNavItem
            key={key}
            imageUrl={iconUrl}
            text={isMenuOpen ? label : ""}
            isShrink={!isMenuOpen}
            isActive={false}
            onClick={() => handleTabClick(navItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default SideMenuNavList;

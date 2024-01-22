import styled from "styled-components";
import { useHeader } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import SideNavItem from "./SideNavItem";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  padding: 0 20px;
`;

const SideMenuNavList = () => {
  const { accountNavItemList } = useGetNavItemList();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const history = useHistory();

  const handleTabClick = (navItem: NavItem) => {
    switch (navItem.navType) {
      case "action":
        navItem.callback();
        break;

      case "route":
        history.push(navItem.routePath);
        break;
    }

    handleToggleMenu(false);
  };

  return (
    <TabContainer>
      {accountNavItemList.map((navItem) => {
        const { key, iconUrl, label } = navItem;

        return (
          <SideNavItem
            key={key}
            imageUrl={iconUrl}
            text={isMenuOpen ? label : ""}
            isActive={false}
            onClick={() => handleTabClick(navItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default SideMenuNavList;

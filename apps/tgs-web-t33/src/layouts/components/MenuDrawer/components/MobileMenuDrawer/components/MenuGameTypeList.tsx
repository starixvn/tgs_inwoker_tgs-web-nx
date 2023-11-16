import styled from "styled-components";
import { GameTypeItem, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { NavItem } from "@/hooks/account/useAccountNavigations";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const { gameTypeNavItemList } = useGetNavItemList();
  const { activeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (navItem: NavItem) => {
    if (navItem.navType !== "action") return;
    navItem.callback();
    handleToggleMenu(false);
  };

  return (
    <TabContainer>
      {gameTypeNavItemList.map((navItem) => {
        const { key, iconUrl, label, gameType } = navItem;

        return (
          <MenuGameTab
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

export default MenuGameTypeList;

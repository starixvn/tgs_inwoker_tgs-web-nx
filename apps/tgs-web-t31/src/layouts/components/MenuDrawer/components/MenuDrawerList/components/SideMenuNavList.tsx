import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import SideNavItem from "./SideNavItem";
import { useGameTypeList } from "@/hooks/home/useGameTypeList";
import LanguageSwitch from "@/components/project/LanguageSwitch";

import downloadImg from "@/assets/t31/images/header/sideMenuItem/Download.png";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background-color: ${({ theme }) => theme.white};
`;

const SideMenuNavList = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType } = useHomeGameContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const handleTabClick = (gameType: GameTypeEnum) => {
    // if (navItem.navType !== "action") return;
    // navItem.callback();
    // handleToggleMenu(false);
  };

  return (
    <TabContainer>
      <SideNavItem
        key={"download"}
        imageUrl={downloadImg}
        text={i18n.t("common.download")}
        onClick={() => {}}
      />
      {gameTypeList.map((navItem) => {
        const { key, text, sideMenuIconUrl, gameType } = navItem;
        if (gameType === GameTypeEnum.NONE) {
          return null;
        }
        return (
          <SideNavItem
            key={key}
            imageUrl={sideMenuIconUrl}
            text={text}
            onClick={() => handleTabClick(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default SideMenuNavList;

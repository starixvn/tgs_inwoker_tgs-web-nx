import styled from "styled-components";
import { GameTypeItem, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useMemo } from "react";
import SideNavItem from "./SideNavItem";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { useGameTypeList } from "@/hooks/home/useGameTypeList";
import LanguageSwitch from "@/components/project/LanguageSwitch";

import downloadImg from "@/assets/t31/images/header/sideMenuItem/Download.png";
import cardgame from "@/assets/t31/images/header/sideMenuItem/Card.png";
import egame from "@/assets/t31/images/header/sideMenuItem/Egame.png";
import esports from "@/assets/t31/images/header/sideMenuItem/Esports.png";
import fishing from "@/assets/t31/images/header/sideMenuItem/Fish.png";
import live from "@/assets/t31/images/header/sideMenuItem/Live.png";
import lottery from "@/assets/t31/images/header/sideMenuItem/Lottery.png";
import sabong from "@/assets/t31/images/header/sideMenuItem/Sabong.png";
import slot from "@/assets/t31/images/header/sideMenuItem/Slot.png";
import sports from "@/assets/t31/images/header/sideMenuItem/Sports.png";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background-color: ${({ theme }) => theme.white};
`;

const SideMenuNavList = () => {
  const sideNavItemList: GameTypeItem[] = useMemo(() => {
    return [
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "small",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
    ] as GameTypeItem[];
  }, []);

  const gameTypeList = useGameTypeList();
  // const { sideNavItemList } = useGetNavItemList();
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
        const { key, text, iconUrl, gameType } = navItem;
        return (
          <SideNavItem
            key={key}
            imageUrl={iconUrl}
            text={text}
            onClick={() => handleTabClick(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default SideMenuNavList;

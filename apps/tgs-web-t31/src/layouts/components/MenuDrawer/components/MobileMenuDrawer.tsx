import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { GameTypeItem } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import SideMenuNavItem from "@/layouts/components/MenuDrawer/components/SideMenuNavItem";

import { NavCardKey, NavItem } from "@/hooks/account/useAccountNavigations";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import Icon from "@/components/project/Icon";

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

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.white};
  height: 100%;
`;

const NavsContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

const DownloadCardContainer = styled.div`
  cursor: pointer;
  height: 62px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
  padding: 0 12px;
  color: ${({ theme }) => theme.iconLable};
  border-bottom: 1px solid ${({ theme }) => theme.black30};
  & > div:first-child {
    margin-right: 10px;
  }
`;

const MobileMenuDrawer = () => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { handleChangeGameType } = useHomeGameContext();

  const history = useHistory();

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

  const handleClickNav = useCallback((navItem: GameTypeItem) => {
    handleToggleMenu(false);
    handleChangeGameType(navItem.gameType);
  }, []);
  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />
      <ContentWrapper>
        <NavsContainer>
          <DownloadCardContainer onClick={() => {}}>
            <Icon iconUrl={downloadImg} width={"40px"} height={"40px"} />
            <span>{i18n.t("common.download")}</span>
          </DownloadCardContainer>
          {sideNavItemList.map((navItem) => {
            return (
              <SideMenuNavItem key={navItem.key} navItem={navItem} handleClick={handleClickNav} />
            );
          })}
        </NavsContainer>
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;

import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useEffect, useState } from "react";
import VendorCard from "@/pages/home/components/VendorCard/index";
import { media } from "@/theme/breakpoints";
import { NavItem, useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import SideNavItem from "@/layouts/components/MenuDrawer/components/MenuDrawerList/components/SideNavItem";

const CategoryContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  row-gap: 10px;
  flex-wrap: wrap;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  align-self: stretch;
  gap: 10px;
  /* max-height: 254px; */
  overflow-x: hidden;

  ${media.sm} {
    max-height: unset;
    overflow-x: unset;
  }
`;

const EmptyText = styled.div`
  color: ${({ theme }) => theme.text};
  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { sideNavItemList } = useGetNavItemList();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const { isMobileSize } = useRwd();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];

  const [currentGameType, setCurrentGameType] = useState<NavItem | null>(null);

  useEffect(() => {
    sideNavItemList.map((item) => {
      if (item.key === currentRoute) {
        setCurrentGameType(item);
      }
    });
  }, [sideNavItemList, currentRoute]);

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (activeGameType === GameTypeEnum.COCKFIGHT) {
      // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
      if (gpcode === "SM01") {
        const gameWindow = window.open("", "Cockfight");
        if (gameWindow) {
          GameService.GetCockfight()
            .then((res) => {
              gameWindow.document.write(res?.data);
              gameWindow.document.close();
              gameWindow.focus();
            })
            .catch(() => {
              gameWindow.close();
            });
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(`/joinlobbygame/${GameTypeEnum.SPORTS}/${gpcode}`, "gamewindow");
      }
    } else {
      const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
      if (audioElement) {
        audioElement.volume = 0;
      }
      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${activeGameType}/${gpcode}`, "gamewindow");
    }
  };

  const hasMappingData = !!lobbyCategoryList.length;

  return (
    <>
      {/* <GameTypeTab /> */}
      <CategoryContentWrapper>
        {isMobileSize && (
          <SideNavItem
            key={currentGameType?.key}
            text={currentGameType?.label}
            isActive={false}
            onClick={() => {}}
          >
            {currentGameType?.iconComponent && React.createElement(currentGameType?.iconComponent)}
          </SideNavItem>
        )}
        <CategoryContent>
          {hasMappingData &&
            lobbyCategoryList.map((provider) => {
              const { code: gpCode, status, name } = provider;

              if (gpCode === "BC") return null;
              return (
                <VendorCard
                  key={gpCode}
                  bgUrl={`/assets/images/home/desktop/${activeGameTypeKey}/bg.png`}
                  imageUrl={
                    isMobileSize
                      ? `/assets/images/home/mobile/${activeGameTypeKey}/${gpCode}.png`
                      : `/assets/images/home/desktop/${activeGameTypeKey}/${gpCode}.png`
                  }
                  venderLogoUrl={`/assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          {!hasMappingData && <EmptyText>No data</EmptyText>}
        </CategoryContent>
      </CategoryContentWrapper>
    </>
  );
};

export default LobbyCategory;

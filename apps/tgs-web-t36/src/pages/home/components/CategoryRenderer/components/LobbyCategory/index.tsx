import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { FilterTag, useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useEffect, useState } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import WebviewModal from "../../../WebviewModal";
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
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const {
    activeGameType,
    activeGameTypeKey,
    handleChangeActiveProviderFilterTag,
    handleChangeGameType,
  } = useHomeGameContext();
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

  const isVirtualSports = (provider: ProviderDto) => {
    //如果遊戲商包含體育和虛擬體育,當作體育來處理
    return (
      !provider.gametypes.includes(GameTypeEnum.SPORTS) &&
      provider.gametypes.includes(GameTypeEnum.RNGSPORTS)
    );
  };

  const handleClickVirtualSport = (provider: ProviderDto) => {
    //只顯示選擇到的遊戲商的遊戲;
    const { code: gpCode, name } = provider;
    const filterTag = {
      gpCode: gpCode,
      name: name,
      tagType: "PROVIDER",
    } as FilterTag;
    handleChangeActiveProviderFilterTag(filterTag);
    handleChangeGameType(GameTypeEnum.RNGSPORTS);
  };

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

      if (Common.isWebview()) {
        setCode(gpcode);
        setIsOpen(true);
        return;
      }

      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${activeGameType}/${gpcode}`, "gamewindow");
    }
  };

  const hasMappingData = !!lobbyCategoryList.length;

  return (
    <>
      <WebviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={`/joinlobbygame/${activeGameType}/${code}`}
      />
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
              const { status, name } = provider;
              const gpCode = "GT_PT"
              // if (gpCode === "BC") return null;
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
                  launchGame={() => {
                    //體育底下的虛擬體育要另外導向到虛擬體育頁面
                    activeGameType === GameTypeEnum.SPORTS && isVirtualSports(provider)
                      ? handleClickVirtualSport(provider)
                      : launchLobbyGame(gpCode);
                  }}
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

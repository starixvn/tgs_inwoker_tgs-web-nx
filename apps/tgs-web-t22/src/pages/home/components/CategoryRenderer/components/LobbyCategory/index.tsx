import {memo} from 'react'
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import DesktopVendorCard from "@/pages/home/components/VendorCard/desktop";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  flex: 1;
  width: 100%;
  overflow-y: auto;

  ${media.sm} {
    margin: 0 auto;
    padding: 15px 0;
    max-width: ${SUB_CONTENT_MAX_WIDTH};
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const DesktopCategoryContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const CategoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 100px;
  gap: 6px;
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const { isMobileSize, isDesktopSize } = useRwd();

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

  const renderMobileLayout = () => {
      return (
        <>
          <GameTypeTab />
          <CategoryContentWrapper>
            <CategoryContent>
              {hasMappingData &&
                lobbyCategoryList.map((provider) => {
                  const { code: gpCode, status, name } = provider;

                  if (gpCode === "BC") return null;
                  return (
                    <MobileVendorCard
                      key={gpCode}
                      bgUrl={`/assets/images/home/mobile/${activeGameTypeKey}/mbg.png`}
                      imageUrl={`/assets/images/home/mobile/${activeGameTypeKey}/${gpCode}.png`}
                      venderLogoUrl={`/assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                      launchGame={() => launchLobbyGame(gpCode)}
                      status={status}
                      venderName={name}
                    />
                  );
                })}
              {!hasMappingData && <div>No data</div>}
            </CategoryContent>
          </CategoryContentWrapper>
        </>
      )
  };

  const renderDesktopLayout = () => {
      return (
        <DesktopCategoryContentWrapper>
          {hasMappingData &&
            lobbyCategoryList.map((provider) => {
              const { code: gpCode, status, name } = provider;

              if (gpCode === "BC") return null;
              return (
                <DesktopVendorCard
                  key={gpCode}
                  bgUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/desktop/${activeGameTypeKey}/bg.png`}
                  imageUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/desktop/${activeGameTypeKey}/${gpCode}.png`}
                  venderLogoUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}
          {!hasMappingData && <div>No data</div>}
        </DesktopCategoryContentWrapper>
      )
  };

  return (
    <Wrapper>
      {isMobileSize && renderMobileLayout()}
      {isDesktopSize && renderDesktopLayout()}
    </Wrapper>
  );
};

export default memo(LobbyCategory);

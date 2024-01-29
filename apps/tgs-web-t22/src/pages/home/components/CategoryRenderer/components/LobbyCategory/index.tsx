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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  flex: 1;
  width: 100%;
  overflow-y: auto; 
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const DesktopWrapper = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(210px, auto);
  gap: 15px 35px;
  width: 100%;
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
  const hasMappingData = !!lobbyCategoryList.length;

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

  const renderMobileLayout = () => {
      return (
        <Wrapper>
          <GameTypeTab />
          <CategoryContentWrapper>
            <CategoryContent>
              {hasMappingData &&
                lobbyCategoryList.map((provider) => {
                  const { code: gpCode, status } = provider;

                  if (gpCode === "BC") return null;
                  return (
                    <MobileVendorCard
                      key={gpCode}
                      imageUrl={`/assets/images/home/mobile/${activeGameTypeKey}/${gpCode}.png`}
                      launchGame={() => launchLobbyGame(gpCode)}
                      status={status}
                    />
                  );
                })}
              {!hasMappingData && <div>No data</div>}
            </CategoryContent>
          </CategoryContentWrapper>
        </Wrapper>
      )
  };

  const renderDesktopLayout = () => {
      return (
        <DesktopWrapper>
          {hasMappingData &&
            lobbyCategoryList.map((provider) => {
              const { code: gpCode, status, name } = provider;
              const imageUrl = `${import.meta.env.BASE_URL}assets/images/home/desktop/${activeGameTypeKey}/${gpCode}.png`;
              
              if (gpCode === "BC") {
                return null;
              }

              return (
                <DesktopVendorCard
                  key={gpCode}
                  imageUrl={imageUrl}
                  launchGame={() => launchLobbyGame(gpCode)}
                  status={status}
                  venderName={name}
                />
              );
            })}

          {!hasMappingData && <div>No data</div>}
        </DesktopWrapper>
      )
  };

  return (
    < >
      {isMobileSize && renderMobileLayout()}
      {isDesktopSize && renderDesktopLayout()}
    </>
  );
};

export default memo(LobbyCategory);

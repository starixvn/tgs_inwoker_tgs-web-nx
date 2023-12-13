import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import VendorCard from "@/pages/home/components/VendorCard/index";
import DesktopVendorCard from "@/pages/home/components/VendorCard/desktop";
import GameTypeTab from "@/pages/home/components/GameTypeTab";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 16px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  width: calc(100% - 78px);
  flex-shrink: 0;
  gap: 12px;
  padding: 12px 0px;
  border-radius: 20px;
  border: 2.5px solid #B78316;
  background-color: #332915;
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
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 8px;
  padding: 14px 0px 18px 14px;
  align-self: stretch;
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

  return (
    <Wrapper>
      {isMobileSize && (
        <>
          <GameTypeTab />
          <CategoryContentWrapper>
            <CategoryContent>
              {hasMappingData &&
                lobbyCategoryList.map((provider) => {
                  const { code: gpCode, status, name } = provider;

                  if (gpCode === "BC") return null;
                  return (
                    <VendorCard
                      key={gpCode}
                      bgUrl={`/assets/images/home/mobile/${activeGameTypeKey}/bg.png`}
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
      )}
      {isDesktopSize && (
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
      )}
    </Wrapper>
  );
};

export default LobbyCategory;

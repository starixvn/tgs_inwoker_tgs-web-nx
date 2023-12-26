import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common, getGameTypeName, i18n } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import React from "react";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useCardWidth } from "@/hooks/home/useCardWidth";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const DesktopCategoryContentWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 14px;
  align-self: stretch;

  ${media.sm} {
    padding: 20px 0;
  }
`;

const CategoryTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.black};
  margin-bottom: 10px;

  display: none;

  ${media.sm} {
    display: block;
  }
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const cardWidth = useCardWidth("14px");

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
      <CategoryContentWrapper>
        <CategoryTitle>{i18n.t(getGameTypeName(activeGameType))}</CategoryTitle>

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
                  style={{
                    width: cardWidth,
                    flexShrink: 0,
                  }}
                />
              );
            })}
          {!hasMappingData && <div>No data</div>}
        </CategoryContent>
      </CategoryContentWrapper>
    </Wrapper>
  );
};

export default LobbyCategory;

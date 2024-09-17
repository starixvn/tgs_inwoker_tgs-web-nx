import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import {
  useAuth,
  useGetLobbyCategoryList,
  useGetNonLobbyCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoadMore from "../LoadMore";
import { media } from "@/theme/breakpoints";
import DesktopVendorCard from "@/pages/home/components/VendorCard/desktop";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 6px;

  ${media.sm} {
    /* margin: 0 auto; */
    padding: 15px 0px;
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
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 16px;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 13px;
  column-gap: 9px;
  align-self: stretch;
`;
const DesktopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 24px 0; */
  /* align-items: center; */
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const { gameList, isLoading } = useGetNonLobbyCategoryList();
  const { isMobileSize, isDesktopSize } = useRwd();
  const { goToLogin } = useAuth();

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      goToLogin();
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
        <CategoryContentWrapper>
          <CategoryContent>
            {hasMappingData &&
              lobbyCategoryList.map((provider) => {
                const { code: gpCode, status, name } = provider;

                if (gpCode === "BC") return null;
                return (
                  //t28 image與component desktop和mobile可共用
                  <DesktopVendorCard
                    key={gpCode}
                    bgUrl={`${utility.imagePathGenerator(
                      `assets/images/home/desktop/${activeGameTypeKey}/mbg.png`,
                    )}`}
                    imageUrl={`/assets/images/home/desktop/${activeGameTypeKey}/${gpCode}.png`}
                    venderLogoUrl={`/assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                    launchGame={() => launchLobbyGame(gpCode)}
                    status={status}
                    venderName={name}
                  />
                );
              })}
            {!hasMappingData && <div>{i18n.t("common.nodata")}</div>}
          </CategoryContent>
          <LoadMore></LoadMore>
        </CategoryContentWrapper>
      )}
      {isDesktopSize && (
        <DesktopWrapper>
          <DesktopCategoryContentWrapper>
            {hasMappingData &&
              gameList.map((game) => {
                const { gpcode, status, name, code } = game;

                if (gpcode === "BC") return null;
                return (
                  <DesktopVendorCard
                    key={gpcode}
                    bgUrl={`${utility.imagePathGenerator(
                      `home/desktop/${activeGameTypeKey}/bg.png`,
                    )}`}
                    imageUrl={`${utility.imagePathGenerator(
                      `${gpcode.toLowerCase()}/en-US/${code}${isDesktopSize ? "@2x" : "@1x"}.webp`,
                    )}`}
                    venderLogoUrl={`${utility.imagePathGenerator(
                      `home/provider_logo/${activeGameTypeKey}/${gpcode}.png`,
                    )}`}
                    launchGame={() => launchLobbyGame(gpcode)}
                    status={status}
                    venderName={name}
                  />
                );
              })}
            {!hasMappingData && <div>{i18n.t("common.nodata")}</div>}
          </DesktopCategoryContentWrapper>
          <LoadMore></LoadMore>
        </DesktopWrapper>
      )}
    </Wrapper>
  );
};

export default LobbyCategory;

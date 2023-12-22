import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import CategoryLabel from "./components/CategoryLabel";
import VendorCard from "@/pages/home/components/VendorCard/index";
import { media } from "@/theme/breakpoints";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 20px 0px;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px 0px;
  width: 100%;
  gap: 10px;
  align-self: stretch;
`;

const CategoryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const { isMobileSize, isDesktopSize } = useRwd();
  const gameTypeList = useGameTypeList();

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
  const categoryIcon = gameTypeList.find((item) => item.key === activeGameTypeKey)?.iconUrl;
  const categorytitle = gameTypeList.find((item) => item.key === activeGameTypeKey)?.title;

  return (
    <CategoryContentWrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={categoryIcon ?? ''} text={categorytitle ?? ''} />
      </CategoryTitle>
      <CategoryContent>
        {hasMappingData &&
          lobbyCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <VendorCard
                key={gpCode}
                bgUrl={`/assets/images/home/mobile/${activeGameTypeKey}/mbg.png`}
                imageUrl={`/assets/images/home/mobile/${activeGameTypeKey}/${gpCode}.png`}
                vendorLogoUrl={`/assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                vendorName={name}
              />
            );
          })}
        {!hasMappingData && <div>No data</div>}
      </CategoryContent>
    </CategoryContentWrapper>
  );
};

export default LobbyCategory;

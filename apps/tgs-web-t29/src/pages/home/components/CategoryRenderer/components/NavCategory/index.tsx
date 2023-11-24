import { useHistory } from "react-router";
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 15px 0px;
  }
`;

const CategoryContentWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: calc(100% - 78px);
  flex-shrink: 0;
  gap: 6px;
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
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  row-gap: 10px;
  column-gap: 9px;
  align-self: stretch;
`;

const NoDataText = styled.div`
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

const NavCategory = () => {
  const { activeNavPopupGameType, activeNavPopupGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { navPopupCategoryList } = useGetLobbyCategoryList();

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (activeNavPopupGameType === GameTypeEnum.COCKFIGHT) {
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
      Common.PopupCenter(`/joinlobbygame/${activeNavPopupGameType}/${gpcode}`, "gamewindow");
    }
  };

  const hasMappingData = !!navPopupCategoryList.length;

  // activeNavPopupGameType just for nav popup displays vendor list

  return (
    <Wrapper>
      <DesktopCategoryContentWrapper>
        {hasMappingData &&
          navPopupCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <DesktopVendorCard
                key={gpCode}
                bgUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/desktop/${activeNavPopupGameTypeKey}/bg.png`}
                imageUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/desktop/${activeNavPopupGameTypeKey}/${gpCode}.png`}
                venderLogoUrl={`${import.meta.env.BASE_URL
                  }assets/images/home/provider_logo/${activeNavPopupGameTypeKey}/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                venderName={name}
              />
            );
          })}
        {!hasMappingData && <NoDataText>No data</NoDataText>}
      </DesktopCategoryContentWrapper>
    </Wrapper>
  );
};

export default NavCategory;

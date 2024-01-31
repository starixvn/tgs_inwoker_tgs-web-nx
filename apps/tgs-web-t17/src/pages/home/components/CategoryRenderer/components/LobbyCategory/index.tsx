import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import VendorCard from "@/pages/home/components/VendorCard/index";
import { media } from "@/theme/breakpoints";

const CategoryContent = styled.div`
  width: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 6px;
  padding: 0px 10px;
  
  ${media.sm} {
    gap: 36px;
    padding: 0px 0px;
  }
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();

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
    <CategoryContent>
      {hasMappingData &&
        lobbyCategoryList.map((provider) => {
          const { code: gpCode, status, name } = provider;

          if (gpCode === "BC") return null;
          return (
            <VendorCard
              key={gpCode}
              bgUrl={`/assets/images/home/desktop/${activeGameTypeKey}/bg.png`}
              imageUrl={`/assets/images/home/desktop/${activeGameTypeKey}/${gpCode}.png`}
              venderLogoUrl={`/assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
              launchGame={() => launchLobbyGame(gpCode)}
              status={status}
              venderName={name}
            />
          );
        })}
      {!hasMappingData && <div>No data</div>}
    </CategoryContent>
  );
};

export default LobbyCategory;

import { useHistory } from "react-router";
import styled from "styled-components";
import { useGetLobbyCategoryList } from "@/core/feature/game/useGetLobbyCategoryList";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameService } from "@/core/services/GameService";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { GameTypeEnum } from "@/constants/GameTypeEnum";
import Common from "@/core/utils/Common";
import VendorCard from "@/pages/home/components/VendorCard";
import { media } from "@/theme/breakpoints";

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 17px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    background-color: transparent;
    padding: 20px 0px;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  row-gap: 12px;
  column-gap: 8px;
  align-self: stretch;

  ${media.sm} {
    row-gap: 36px;
    column-gap: 40px;
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
    <CategoryContentWrapper>
      <CategoryContent>
        {hasMappingData &&
          lobbyCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;

            if (gpCode === "BC") return null;
            return (
              <VendorCard
                key={gpCode}
                imageUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/${activeGameTypeKey}/${gpCode}.png`}
                venderLogoUrl={`${
                  import.meta.env.BASE_URL
                }assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                venderName={name}
              />
            );
          })}
        {!hasMappingData && <div>No data</div>}
      </CategoryContent>
    </CategoryContentWrapper>
  );
};

export default LobbyCategory;

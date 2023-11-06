import VendorCard from "@/components/pages/home/components/VendorCard";
import { useGetLobbyCategoryList } from "@/core/feature/game/useGetLobbyCategoryList";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { GameService } from "@/core/services/GameService";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import Common from "@/core/utils/Common";
import { media } from "@/theme/breakpoints";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 10px;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    background-color: transparent;
  }
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-shrink: 0;
  width: 100%;

  ${media.sm} {
    row-gap: 36px;
    flex-wrap: wrap;
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
    <>
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
    </>
  );
};

export default LobbyCategory;

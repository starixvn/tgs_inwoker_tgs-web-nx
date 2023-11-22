import { useHistory } from "react-router";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import MobileVendorCard from "@/pages/home/components/VendorCard/mobile";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const CategoryContentWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  width: calc(100% - 78px);
  flex-shrink: 0;
  gap: 6px;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const CategoryContent = styled.div`
  margin-left: 6px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  row-gap: 13px;
  column-gap: 12px;
  align-self: stretch;
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
    <Wrapper>
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
                  bgUrl={`${import.meta.env.BASE_URL
                    }assets/images/home/mobile/${activeGameTypeKey}/bg.png`}
                  imageUrl={`${import.meta.env.BASE_URL
                    }assets/images/home/mobile/${activeGameTypeKey}/${gpCode}.png`}
                  venderLogoUrl={`${import.meta.env.BASE_URL
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
    </Wrapper>
  );
};

export default LobbyCategory;

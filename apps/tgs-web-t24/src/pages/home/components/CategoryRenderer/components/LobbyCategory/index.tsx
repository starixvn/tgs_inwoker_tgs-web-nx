import { useHistory } from "react-router";
import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useGetLobbyCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import CategoryLabel from "../../../CategoryLabel";
import { GameTypeEnum } from "@/constants/GameTypeEnum";
import VendorCard from "@/pages/home/components/VendorCard";
import { media } from "@/theme/breakpoints";
import back from "@/assets/t24/images/home/back.svg";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const CategoryContentWrapper = styled.div`
  width: 100%;
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
  gap: 12px 16.5px;
  align-self: stretch;

  ${media.sm} {
    gap: 24px;
  }
`;

const LobbyCategory = () => {
  const { activeGameType, activeGameTypeKey, handleChangeGameType } = useHomeGameContext();
  const { account } = useAccountStore();
  const history = useHistory();
  const { lobbyCategoryList } = useGetLobbyCategoryList();
  const categoryTitle = useGameTypeList().find((item) => item.gameType === activeGameType)?.text;

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
      <CategoryLabel
        imageUrl={back}
        text={categoryTitle || ""}
        onClick={() => handleChangeGameType(GameTypeEnum.NONE)}
      ></CategoryLabel>
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

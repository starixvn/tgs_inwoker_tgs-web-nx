import { GameService } from "@/core/services/GameService";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import ButtonText from "@/components/pages/home/components/ButtonText";
import CategoryLabel from "@/components/pages/home/components/CategoryRenderer/components/LobbyCategory/components/CategoryLabel";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useGameStore } from "@/core/stores/useGameStore";
import Common from "@/core/utils/Common";
import getDisplayGameType from "@/core/utils/getDisplayGameType";
import { useMemo } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CardVendor from "../../../CardVender";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { useGetLobbyCategoryList } from "@/core/feature/game/useGetLobbyCategoryList";

const Wrapper = styled.div`
  width: 100%;
  margin: 15px 0;
  cursor: pointer;
`;

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 15px;
  width: 100%;
  margin-bottom: 30px;
`;

type Props = {
  // iconUrl: string;
  // text: string;
  // gameType: number;
  showDataLength: number;
  // handleViewAllClick: () => void;
  gameTypeName: string;
};

const LobbyCategory = ({ showDataLength, gameTypeName }: Props) => {
  const { activeGameType } = useHomeGameContext();
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

  return (
    <Wrapper>
      {/*<CategoryTitle>*/}
      {/*  <CategoryLabel imageUrl={iconUrl} text={text} />*/}
      {/*  <ButtonText size="small" text={"View all"} onClick={handleViewAllClick} />*/}
      {/*</CategoryTitle>*/}
      <CategoryContent>
        {lobbyCategoryList &&
          lobbyCategoryList.map((provider) => {
            const { code: gpCode, status, name } = provider;
            return (
              <CardVendor
                key={gpCode}
                imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${gpCode}.png`}
                venderLogoUrl={`${process.env.PUBLIC_URL}/assets/images/home/provider_logo/${gameTypeName}/${gpCode}.png`}
                launchGame={() => launchLobbyGame(gpCode)}
                status={status}
                hoverVenderName={name}
              />
            );
          })}
      </CategoryContent>
    </Wrapper>
  );
};

export default LobbyCategory;

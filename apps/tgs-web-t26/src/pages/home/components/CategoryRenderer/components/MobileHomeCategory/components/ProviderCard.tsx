import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { ProviderDto } from "@tgs-web-nx/types";
import { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Common } from "@tgs-web-nx/utils";

const CardContainer = styled.div<{ $imageUrl: string }>`
  position: relative;
  width: calc((100% - 10px) / 2);
  height: 88px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  & > img {
    width: 100px;
    height: 100px;
  }
`;

const ProviderLogo = styled.div`
  width: 75px;
  height: 42px;
  position: absolute;
  left: 55%;
  top: 10%;
  z-index: 10;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

type Props = {
  provider: ProviderDto;
};
const ProviderCard = (props: Props) => {
  const { provider } = props;
  const { account } = useAccountStore();
  const history = useHistory();
  const { activeGameType, activeGameTypeKey } = useHomeGameContext();

  useEffect(() => {
    getProviderBG();
  });

  const getProviderBG = () => {
    switch (provider.gametypes[0]) {
      case GameTypeEnum.LIVE:
      case GameTypeEnum.LIVELOBBY:
        return `/assets/images/provider/BG/live.png`;
      case GameTypeEnum.ESPORTS:
        return `/assets/images/provider/BG/esport.png`;
      case GameTypeEnum.FISH:
      case GameTypeEnum.FISHLOBBY:
        return `/assets/images/provider/BG/fishing.png`;
      case GameTypeEnum.QIPAI:
      case GameTypeEnum.QIPAILOBBY:
        return `/assets/images/provider/BG/cardgame.png`;
      case GameTypeEnum.LOTTERY:
      case GameTypeEnum.LOTTERYLOBBY:
        return `/assets/images/provider/BG/lottery.png`;
      case GameTypeEnum.SPORTS:
        return `/assets/images/provider/BG/sports.png`;
      case GameTypeEnum.TABLEGAME:
        return `/assets/images/provider/BG/egame.png`;
      case GameTypeEnum.SLOT:
        return `/assets/images/provider/BG/slot.png`;
      default:
        return `/assets/images/provider/BG/sports.png`;
    }
  };

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
    <CardContainer
      $imageUrl={getProviderBG() as string}
      onClick={() => {
        launchLobbyGame(provider.code);
      }}
    >
      <img src={`/assets/images/home/desktop/all/${provider.code}.png`} alt="" />
      <ProviderLogo>
        <img src={`/assets/images/home/provider_logo/all/${provider.code}.png`} alt="" />
      </ProviderLogo>
    </CardContainer>
  );
};

export default ProviderCard;

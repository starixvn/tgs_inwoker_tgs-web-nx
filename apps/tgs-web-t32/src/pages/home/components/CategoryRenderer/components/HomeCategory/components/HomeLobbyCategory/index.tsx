import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useProvider } from "@tgs-web-nx/core/features";
import { useMemo } from "react";
import { ProviderDto } from "@tgs-web-nx/types";
import MobileVendorCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeVendorCard";
import { media } from "@/theme/breakpoints";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import LoadingSvg from "@/components/project/LoadingSvg";

const CategoryContent = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  margin-top: 10px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      background: ${(props) => props.theme.tertiaryDark};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const Nodata = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  margin: 40px;
`;

const SvgContainer = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 100px;
    height: 100px;
    animation: rotate 2s linear infinite;
  }
`;

type Props = {
  activeLocalGameType: GameTypeEnum;
};

const HomeLobbyCategory = ({ activeLocalGameType }: Props) => {
  const { account } = useAccountStore();
  const history = useHistory();
  const { providerList, isLoading } = useProvider();
  const gameTypeList = useGameTypeList();

  const lobbyCategoryList = useMemo<ProviderDto[]>(() => {
    return providerList.filter((provider: { gametypes: GameTypeEnum[]; }) => {
      return provider.gametypes.includes(activeLocalGameType);
    });
  }, [activeLocalGameType, providerList]);

  const localActiveGameTypeKey = gameTypeList.find((item) => item.gameType === activeLocalGameType)?.key;

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

  if (isLoading || !gameTypeList.length || !providerList.length) {
    return <SvgContainer><LoadingSvg /></SvgContainer>
  }

  return (
    <CategoryContent>
      {hasMappingData &&
        lobbyCategoryList.map((provider) => {
          const { code: gpCode, status, name } = provider;

          if (gpCode === "BC") return null;
          return (
            <MobileVendorCard
              key={gpCode}
              bgUrl={`/assets/images/home/mobile/${localActiveGameTypeKey}/mbg.png`}
              imageUrl={`/assets/images/home/mobile/${localActiveGameTypeKey}/${gpCode}.png`}
              vendorLogoUrl={`/assets/images/home/provider_logo/${localActiveGameTypeKey}/${gpCode}.png`}
              launchGame={() => launchLobbyGame(gpCode)}
              status={status}
              vendorName={name}
            />
          );
        })}
      {!hasMappingData && <Nodata>No data</Nodata>}
    </CategoryContent>
  );
};

export default HomeLobbyCategory;

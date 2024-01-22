import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, useHomeGameContext, useProvider } from "@tgs-web-nx/core/features";
import { useEffect, useState } from "react";
import Tab from "./Tab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import LoadingSvg from "@/components/project/LoadingSvg";

const TabContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  /* height: 100%; */
  max-height: 88px;
  display: flex;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  padding: 10px;
  background: linear-gradient(180deg, #4e4e4e 0%, #2f2f2f 100%);

  /* background:; */
  /* ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.tertiaryDark};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  } */
`;

const SvgContainer = styled.div`
  height: 100%;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 72px;
  flex-shrink: 0;
`;

type GameTypeItem = {
  key: string;
  iconUrl?: string;
  Icon: React.FC;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
  bgUrl?: string;
  iconActiveUrl?: string;
};

const GameTypeTab = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const { providerList, isLoading } = useProvider();
  const [filteredGameTypeList, setFilteredGameTypeList] = useState<GameTypeItem[]>([]);
  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);
  };

  useEffect(() => {
    if (providerList && gameTypeList) {
      const filteredList = gameTypeList.filter((gameTypeItem) => {
        if (providerList.length) {
          const hasData = providerList.some((provider) => {
            return provider.gametypes.includes(gameTypeItem.gameType);
          });
          return hasData;
        }
        return true;
      });

      setFilteredGameTypeList(filteredList);
    }
  }, [providerList, gameTypeList]);
  if (isLoading || !gameTypeList.length || !providerList.length) {
    return (
      <SvgContainer>
        <LoadingSvg />
      </SvgContainer>
    );
  }

  return (
    <TabContainer>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, Icon, text, gameType, fontSize } = gameTypeItem;
        return (
          <Tab
            key={key}
            Icon={Icon}
            text={text}
            isActive={gameType === activeGameType}
            fontSize={fontSize}
            onClick={() => switchGameType(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;

import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, useHomeGameContext, GameTypeItem } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router-dom";
import Tab from "./Tab";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const TabContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainLightBackground};
  gap: 5px;
`;

const GameTypeTab = () => {
  const history = useHistory();
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType, providerList, handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();
  const { isMobileSize } = useRwd();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameTypeItem: GameTypeItem) => {
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);

    if (gameTypeItem.gameType === GameTypeEnum.NONE) {
      handleChangeGameType(GameTypeEnum.NONE);
      history.push(`/`);
    } else {
      handleChangeGameType(gameTypeItem.gameType);
      history.push(`/main/${gameTypeItem.key}`);
    }
  };

  const filteredGameTypeList = gameTypeList.filter((gameTypeItem) => {
    if (gameTypeItem.gameType === GameTypeEnum.NONE) return true;

    if (providerList.length) {
      const hasData = providerList.some((provider) => {
        return provider.gametypes.includes(gameTypeItem.gameType);
      });
      return hasData;
    }
    return true;
  });

  return (
    <TabContainer>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType } = gameTypeItem;

        if (isMobileSize && gameType === GameTypeEnum.NONE) {
          return null;
        }

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
            text={text}
            isActive={gameType === activeGameType}
            onClick={() => switchGameType(gameTypeItem)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;

import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Tab from "./Tab";
import useHomeGameTypeList from "@/hooks/home/useHomeGameTypeList";

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
  const gameTypeList = useHomeGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag } = useHomeGameContext();

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

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
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
            onClick={() => switchGameType(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;

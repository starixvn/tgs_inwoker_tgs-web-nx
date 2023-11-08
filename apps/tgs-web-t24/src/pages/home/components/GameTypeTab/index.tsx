import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import styled from "styled-components";
import Tab from "./Tab";

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
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();

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
            onClick={() => handleChangeGameType(gameType)}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;

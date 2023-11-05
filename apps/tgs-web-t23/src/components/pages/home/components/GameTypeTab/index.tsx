import useGameTypeList from "@/hooks/home/useGameTypeList";
import styled from "styled-components";
import Tab from "./Tab";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";

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

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType } = gameTypeItem;

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

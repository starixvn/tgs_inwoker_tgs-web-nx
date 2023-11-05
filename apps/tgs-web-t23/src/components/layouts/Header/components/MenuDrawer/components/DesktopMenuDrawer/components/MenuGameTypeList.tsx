import useGameTypeList from "@/hooks/home/useGameTypeList";
import styled from "styled-components";
import MenuGameTab from "./MenuGameTab";
import { useHomeGameContext } from "@/core/feature/game/useHomeGameContext";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();

  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType } = gameTypeItem;

        return (
          <MenuGameTab
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

export default MenuGameTypeList;

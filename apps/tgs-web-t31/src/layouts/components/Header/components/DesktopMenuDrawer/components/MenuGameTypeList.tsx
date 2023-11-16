import styled from "styled-components";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const TabContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, activedIconUrl,iconUrl, text, gameType } = gameTypeItem;
        return (
          <MenuGameTab
            key={key}
            imageUrl={iconUrl}
            activedIconUrl={activedIconUrl}
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

import React from "react";
import { GameTypeItem, useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CategorySlider from "@/pages/home/components/CategoryRenderer/components/HomeCategory/GameTypeCategory/CategorySlider";
import Icon from "@/components/project/Icon";
import iconGoTo from "@/assets/t30/images/home/icon-goto.svg";

const GameTypeCategoryContainer = styled.div``;
const CategoryHeader = styled.div`
  background: ${({ theme }) => theme.mainLightBackground};
  padding: 10px 12px;
  display: flex;
  align-items: center;
  font-size: 0.937rem;
  font-weight: 600;
  gap: 4px;
  cursor: pointer;
`;

type Props = {
  gameTypeItem: GameTypeItem;
  gameList: GameItem[];
};

const GameTypeCategory = ({ gameTypeItem, gameList }: Props) => {
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const handleClick = () => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <GameTypeCategoryContainer>
      <CategoryHeader onClick={handleClick}>
        <Icon iconUrl={gameTypeItem.iconUrl} width={"18px"} height={"18px"} />
        {gameTypeItem.text}
        <Icon
          iconUrl={iconGoTo}
          width={"20px"}
          height={"20px"}
          style={{
            marginLeft: "auto",
            cursor: "pointer",
          }}
        />
      </CategoryHeader>

      {!!gameList.length && <CategorySlider gameType={gameTypeItem.gameType} gameList={gameList} />}
    </GameTypeCategoryContainer>
  );
};

export default React.memo(GameTypeCategory);

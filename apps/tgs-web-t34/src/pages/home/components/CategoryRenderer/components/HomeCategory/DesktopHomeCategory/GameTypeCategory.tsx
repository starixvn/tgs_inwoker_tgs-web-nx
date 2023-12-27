import React from "react";
import styled from "styled-components";
import GameTypeCategoryCard from "./GameTypeCategoryCard";
import { useGetHomeCategoryListV2 } from "@/hooks/home/useGetHomeCategoryListV2";

const GameTypeCategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #1f72ad;
`;

const GameTypeCategory = () => {
  const { gameTypeItemList, gameTypeDictionary } = useGetHomeCategoryListV2();

  return (
    <GameTypeCategoryContainer>
      {gameTypeItemList
        .filter((gameTypeItem, index) => index < 6)
        .map((gameTypeItem, index) => {
          return <GameTypeCategoryCard key={index} gameTypeItem={gameTypeItem} />;
        })}
    </GameTypeCategoryContainer>
  );
};

export default GameTypeCategory;

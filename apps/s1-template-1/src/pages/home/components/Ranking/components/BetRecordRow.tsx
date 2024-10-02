import MaskPlayerName from "@/pages/home/components/Ranking/components/MaskPlayerName";
import { RankTableCol, RankTableRow } from "@/pages/home/components/Ranking/styles";
import React, { forwardRef, LegacyRef } from "react";
import styled from "styled-components";

const GameLabelContainer = styled.div`
  width: 28px;
  text-align: center;
`;

export interface BetRecord {
  key: string;
  gameName: string;
  playerName: string;
  betAmount: number;
}

const GameLabel = ({ gameName }: { gameName: string }) => {
  const getGameIconUrl = () => {
    switch (gameName) {
      default:
        return ranking_1;
    }
  };

  return (
    <GameLabelContainer>
      <img src={getGameIconUrl()} alt={gameName} />
    </GameLabelContainer>
  );
};

type Props = {
  rank: number;
  betRecord: BetRecord;
};
const BetRecordRow = forwardRef(
  ({ rank, betRecord }: Props, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { gameName, playerName, betAmount } = betRecord;

    return (
      <RankTableRow ref={ref as any}>
        <RankTableCol>
          {/*<GameLabel gameName={gameName} />*/}
          {gameName}
        </RankTableCol>
        <RankTableCol>
          <MaskPlayerName playerName={playerName} />
        </RankTableCol>
        <RankTableCol>{betAmount}</RankTableCol>
      </RankTableRow>
    );
  },
);

export default BetRecordRow;

function getGameIconUrl(gameName: string) {
  switch (gameName) {
    default:
      return "";
  }
}

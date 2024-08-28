import React from "react";
import FlipMove from "react-flip-move";
import {
  RankingTable,
  RankingTableTitle,
  RankTableBody,
  RankTableCol,
  RankTableRow,
} from "@/pages/home/components/Ranking/styles";
import RankItemRow, { RankItem } from "@/pages/home/components/Ranking/components/RankItemRow";

type Props = {
  leaderboard: RankItem[];
};
const WinningRankingTable = ({ leaderboard }: Props) => {
  return (
    <RankingTable>
      <RankingTableTitle>
        <RankTableRow>
          <RankTableCol>Rank</RankTableCol>
          <RankTableCol>Player</RankTableCol>
          <RankTableCol>Profit</RankTableCol>
        </RankTableRow>
      </RankingTableTitle>
      <RankTableBody>
        <FlipMove style={{ width: "100%" }}>
          {leaderboard.map((rankItem, index) => {
            return <RankItemRow key={rankItem.key} rank={index + 1} rankItem={rankItem} />;
          })}
        </FlipMove>
      </RankTableBody>
    </RankingTable>
  );
};

export default WinningRankingTable;

import MaskPlayerName from "@/pages/home/components/Ranking/components/MaskPlayerName";
import { RankTableCol, RankTableRow } from "@/pages/home/components/Ranking/styles";
import React, { forwardRef, Ref } from "react";
import styled from "styled-components";

const RankLabelContainer = styled.div`
  width: 28px;
  text-align: center;
`;

export interface RankItem {
  key: string;
  playerName: string;
  betAmount: number;
}

const RankLabel = ({ rank }: { rank: number }) => {
  const RankContent = () => {
    switch (rank) {
      case 1:
        return <img src={""} alt={"ranking_1"} />;
      case 2:
        return <img src={""} alt={"ranking_2"} />;
      case 3:
        return <img src={""} alt={"ranking_3"} />;
      default:
        return <span>{rank}</span>;
    }
  };

  return (
    <RankLabelContainer>
      <RankContent />
    </RankLabelContainer>
  );
};

type Props = {
  rank: number;
  rankItem: RankItem;
};

const RankItemRow = forwardRef(
  ({ rank, rankItem }: Props, ref: Ref<HTMLDivElement> | undefined) => {
    const { playerName, betAmount } = rankItem;

    return (
      <RankTableRow ref={ref as any}>
        <RankTableCol>
          <RankLabel rank={rank} />
        </RankTableCol>
        <RankTableCol>
          <MaskPlayerName playerName={playerName} />
        </RankTableCol>
        <RankTableCol>{betAmount}</RankTableCol>
      </RankTableRow>
    );
  },
);

export default RankItemRow;

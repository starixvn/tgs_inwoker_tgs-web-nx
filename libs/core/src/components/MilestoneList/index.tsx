import styled from "styled-components";
import Indicator from "./components/TitleIndicator";
import RewardCard from "./components/RewardCard";
import { contextType, RewardContext, useRewardPage } from "@tgs-web-nx/core/hooks";
import { createContext, useContext, useEffect, useMemo } from "react";
import { media } from "@tgs-web-nx/constants";

const Title = styled.div<{ $titleColor: string; $subTitleColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div:first-child {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme, $titleColor }) => $titleColor};
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme, $subTitleColor }) => $subTitleColor};
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const RewardContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  justify-content: space-between;
  ${media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MilestoneList = () => {
  const context = useContext(RewardContext) as contextType;
  const { titleColor, subTitleColor } = context.colors;

  return (
    <>
      <Title $titleColor={titleColor} $subTitleColor={subTitleColor}>
        <div>子標題</div>
        <div>
          <Indicator />
          <div>xxxxxxxxxxxxxxx</div>
        </div>
      </Title>
      <RewardContainer>
        {context.selectedMilestone?.rewards.map((reward: any, index: number) => {
          return <RewardCard key={index} index={index} {...reward} />;
        })}
      </RewardContainer>
    </>
  );
};

export default MilestoneList;

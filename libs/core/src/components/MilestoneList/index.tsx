import styled from "styled-components";
import RewardCard from "./components/RewardCard";
import { useContext } from "react";
import { media } from "@tgs-web-nx/constants";
import { ConditionType } from "@tgs-web-nx/types";
import { contextType, RewardContext } from "@tgs-web-nx/core/features";
import Subtitle from "./components/Subtitle";

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

  return (
    <>
      <Subtitle subTitle={context.selectedMilestone?.subSubject} />
      <RewardContainer>
        {context.selectedMilestone?.conditions?.map((condition: ConditionType, index: number) => {
          return (
            <RewardCard
              key={index}
              condition={condition}
              index={index}
              totalValidBetAmount={context.selectedMilestone.totalValidBetAmount}
              totalDepositAmount={context.selectedMilestone.totalDepositAmount}
            />
          );
        })}
      </RewardContainer>
    </>
  );
};

export default MilestoneList;

import styled from "styled-components";
import Indicator from "./components/TitleIndicator";
import RewardCard from "./components/RewardCard";
import { useContext } from "react";
import { media } from "@tgs-web-nx/constants";
import { i18n } from "@tgs-web-nx/utils";
import { ConditionType } from "@tgs-web-nx/types";
import { contextType, RewardContext } from "@tgs-web-nx/core/features";

const Title = styled.div<{ $titleColor: string }>`
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
    color: ${({ theme, $titleColor }) => $titleColor};
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
  const { titleColor } = context.colors;

  return (
    <>
      <Title $titleColor={titleColor}>
        <div>{context.selectedMilestone?.subSubject}</div>
        <div>
          <Indicator />
          <div>{i18n.t("reward.incompleteMilestones")}</div>
        </div>
      </Title>
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

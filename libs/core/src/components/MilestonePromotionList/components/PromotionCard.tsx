import styled from "styled-components";
import bg1 from "libs/core/static/images/promotion/bg1.svg";
import bg2 from "libs/core/static/images/promotion/bg2.svg";
import bg3 from "libs/core/static/images/promotion/bg3.svg";
import indicator from "libs/core/static/images/promotion/indicator.svg";
import { useContext, useState } from "react";
import { useRwd, RewardContext, contextType } from "@tgs-web-nx/core/hooks";
import { media } from "@tgs-web-nx/constants";
import { Collapse } from "@mui/material";
import MilestoneProcessBar from "./ProcessBar";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import { ConditionType, MilestoneType } from "@tgs-web-nx/types";
import moment from "moment";
import RewardCard from "../../MilestoneList/components/RewardCard";

const backgrounds = [bg1, bg2, bg3];

const CardContainer = styled.div<{ $index: number }>`
  flex-shrink: 0;
  background-image: url(${(props) => backgrounds[props.$index % backgrounds.length]});
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  aspect-ratio: 338 / 170;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${media.sm} {
    max-height: 170px;
    max-width: 338px;
  }
`;

const RuleButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const RuleButton = styled.div`
  background: #feba34;
  width: fit-content;
  height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-weight: 400;
`;

const Content = styled.div`
  display: flex;
  color: white;
  gap: 10px;
`;

const PromotionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentText = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  ${media.sm} {
    gap: 0;
  }
  div:first-child {
    width: 60px;
    ${media.sm} {
      width: 85px;
    }
  }
`;

const PromotionCard = (props: { index: number; milestone: MilestoneType }) => {
  const context = useContext(RewardContext) as contextType;
  const {
    name,
    subSubject,
    totalValidBetAmount,
    totalDepositAmount,
    from,
    to,
    conditions,
    promotionId,
  } = props.milestone;
  const { isMobileSize, isDesktopSize } = useRwd();
  const [expanded, setExpanded] = useState(false);

  const history = useHistory();
  const totalMilestoneLength = conditions.length;
  const completeMilestoneLength = conditions.filter((condition) => condition.isSent).length;

  return (
    <>
      <CardContainer
        $index={props.index}
        onClick={() => {
          isDesktopSize ? context.setSelectedMilestone(props.milestone) : setExpanded(!expanded);
        }}
      >
        <RuleButtonContainer>
          <RuleButton
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/promotion/${promotionId}`);
            }}
          >
            {i18n.t("reward.rules")}
          </RuleButton>
        </RuleButtonContainer>
        <Content>
          <img src={indicator} alt="indicator" style={{ alignSelf: "flex-start" }} />
          <PromotionContent>
            <Title>{name}</Title>
            <ContentText>
              <div>{i18n.t("reward.date")}</div>
              <div>{`${moment(from).format("YYYY-MM-DD")}~${moment(to).format("YYYY-MM-DD")}`}</div>
            </ContentText>
            <ContentText>
              <div>{i18n.t("reward.milestone")}</div>
              <div>{`${completeMilestoneLength} / ${totalMilestoneLength}`}</div>
            </ContentText>
            <MilestoneProcessBar total={totalMilestoneLength} current={completeMilestoneLength} />
          </PromotionContent>
        </Content>
      </CardContainer>
      {isMobileSize && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {conditions?.map((condition: ConditionType, index: number) => {
            return (
              <RewardCard
                key={index}
                condition={condition}
                index={index}
                totalValidBetAmount={totalValidBetAmount}
                totalDepositAmount={totalDepositAmount}
              />
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default PromotionCard;

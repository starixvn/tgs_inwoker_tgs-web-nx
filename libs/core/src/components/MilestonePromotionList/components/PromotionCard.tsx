import styled from "styled-components";
import bg1 from "libs/core/static/images/promotion/bg1.svg";
import bg2 from "libs/core/static/images/promotion/bg2.svg";
import bg3 from "libs/core/static/images/promotion/bg3.svg";
import indicator from "libs/core/static/images/promotion/indicator.svg";
import { useContext, useState } from "react";
import { useRwd, RewardContext, contextType } from "@tgs-web-nx/core/hooks";
import { media } from "@tgs-web-nx/constants";
import MilestoneList from "../../MilestoneList";
import { Collapse } from "@mui/material";
import MilestoneProcessBar from "./ProcessBar";
const backgrounds = [bg1, bg2, bg3];

const CardContainer = styled.div<{ $index: number }>`
  flex-shrink: 0;
  background-image: url(${(props) => backgrounds[props.$index % backgrounds.length]});
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 170px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${media.sm} {
    width: 338px;
    height: 170px;
  }
`;

const RuleButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const RuleButton = styled.div`
  background: #feba34;
  width: 70px;
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
`;

const ContentText = styled.div`
  width: 100%;
  display: flex;
  div:first-child {
    width: 85px;
  }
`;

const PromotionCard = (props: any) => {
  const context = useContext(RewardContext) as contextType;
  const { title, date, current, complete } = props.milestone;
  const { isMobileSize, isDesktopSize } = useRwd();
  const [expanded, setExpanded] = useState(false);

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
            }}
          >
            Rules
          </RuleButton>
        </RuleButtonContainer>
        <Content>
          <img src={indicator} alt="indicator" style={{ alignSelf: "flex-start" }} />
          <PromotionContent>
            <Title>{title}</Title>
            <ContentText>
              <div>Date</div>
              <div>{date}</div>
            </ContentText>
            <ContentText>
              <div>Milestones</div>
              <div>{`${current} / ${complete}`}</div>
            </ContentText>
            <MilestoneProcessBar total={complete} current={current} />
          </PromotionContent>
        </Content>
      </CardContainer>
      {isMobileSize && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <MilestoneList />
        </Collapse>
      )}
    </>
  );
};

export default PromotionCard;

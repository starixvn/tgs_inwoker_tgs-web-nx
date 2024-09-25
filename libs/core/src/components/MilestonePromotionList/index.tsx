import styled from "styled-components";
import PromotionCard from "./components/PromotionCard";
import { memo } from "react";
import { media } from "@tgs-web-nx/constants";
import { GetMilestoneListResDto, MilestoneType } from "@tgs-web-nx/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.sm} {
    flex-direction: row;
    padding: 10px;
  }
`;

const RewardPromotion = memo((props: { milestoneList: GetMilestoneListResDto }) => {
  return (
    <Container>
      {props?.milestoneList?.data?.map((milestone: MilestoneType, index: number) => {
        return <PromotionCard key={milestone.promotionId} index={index} milestone={milestone} />;
      })}
    </Container>
  );
});

export default RewardPromotion;

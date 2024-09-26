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
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #c7c7c7;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #a8a8a8;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
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

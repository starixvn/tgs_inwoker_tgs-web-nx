import styled from "styled-components";
import PromotionCard from "./components/PromotionCard";
import { memo } from "react";
import { media } from "@tgs-web-nx/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: fit-content;
  overflow: auto;
  padding: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.sm} {
    flex-direction: row;
  }
`;

const RewardPromotion = memo((props: any) => {
  return (
    <Container>
      {props?.milestoneList?.map((milestone: any, index: number) => {
        return <PromotionCard key={milestone.id} index={index} milestone={milestone} />;
      })}
    </Container>
  );
});

export default RewardPromotion;

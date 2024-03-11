import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Marquee from "@/pages/home/components/CardPrompt/components/Marquee";

const PromotionListContainer = styled.div`
  display: flex;
  padding: 10px 0;
`;

type Props = {};

const PromotionList = (props: Props) => {
  const history = useHistory();

  return (
    <PromotionListContainer>
      <Marquee />
    </PromotionListContainer>
  );
};

export default PromotionList;

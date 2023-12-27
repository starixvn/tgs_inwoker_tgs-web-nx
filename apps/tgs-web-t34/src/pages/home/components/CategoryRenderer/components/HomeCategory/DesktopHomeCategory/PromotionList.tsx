import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import Marquee from "react-fast-marquee";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import BannerImage from "@/pages/promotion/components/BannerImage";

const PromotionListContainer = styled.div`
  display: flex;
  padding: 10px 0;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 118px;
  cursor: pointer;
  //padding: 34.37% 0 0 0;
`;

type Props = {};

const PromotionList = (props: Props) => {
  const history = useHistory();
  const { promotionList, isEmpty } = usePromotionPage();
  const ref = useRef<null | HTMLDivElement>(null);

  const handleEnterDetail = (promotionData: Promotion) => {
    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionListContainer>
      <Marquee ref={ref}>
        {promotionList.map((promotionData, index) => {
          return (
            <BannerWrapper key={index} onClick={() => handleEnterDetail(promotionData)}>
              <BannerImage promotionData={promotionData} />
            </BannerWrapper>
          );
        })}
      </Marquee>
    </PromotionListContainer>
  );
};

export default PromotionList;

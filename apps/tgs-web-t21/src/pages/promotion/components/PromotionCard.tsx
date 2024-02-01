import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";

const PromotionCardContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  gap: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;

  ${media.sm} {
    flex-direction: row;
    width: calc((100% - 40px));
  }
`;
const BannerWrapper = styled.div`
  pointer-events: none;
  width: 100%;
  display: flex;
`;

const PromotionTextContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 17.5px 11px;
  gap: 20.84px;
  justify-content: space-between;
  background: ${({ theme }) => theme.gray5};
`;

const TitleWrapper = styled.div`
  font-size: 1.062rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.black};
`;

const ClickMoreContainer = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.gray20}`};
  padding: 10px 0;
`;

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();

  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>
      <PromotionTextContainer>
        <TitleWrapper>
          <Title>{promotionData.name}</Title>
          <SubTitle>{promotionData.subSubject}</SubTitle>
        </TitleWrapper>
        <ClickMoreContainer>
          <MoreButton onClick={handleEnterDetail}>{i18n.t("common.more")}</MoreButton>
        </ClickMoreContainer>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);

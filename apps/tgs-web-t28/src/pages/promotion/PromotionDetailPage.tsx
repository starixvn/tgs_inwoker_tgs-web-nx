import styled from "styled-components";
import moment from "moment";
import { usePromotionDetailPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useState } from "react";
import BannerImage from "@/pages/promotion/components/BannerImage";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import extend from "@/assets/t28/images/promotion/IconExtend.svg";
import cost from "@/assets/t28/images/promotion/IconCost.svg";

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  flex-shrink: 0;

  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
    padding: 22px;
  }
`;
const BannerWrapper = styled.div`
  width: 100%;
  height: calc((100vw - 44px) * 0.4);
  ${media.sm} {
    height: calc(100% * 2.858);
    border-radius: 12px;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
  padding-bottom: 73px;
`;
const TextArea = styled.div`
  /* margin-bottom: 40px; */
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.orange};
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 10px;

  ${media.sm} {
    font-size: 2rem;
  }
`;
const Description = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 500;
  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const TermsAndConditions = styled(Description)`
  ${media.sm} {
    padding-left: 30px;
  }
`;

const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: 63px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    position: relative;
    background: transparent;
  }
`;

const TncContainer = styled.div`
  display: flex;
  & > img {
    height: 20px;
    width: 20px;
    margin-left: 11px;
    cursor: pointer;
    ${media.sm} {
      height: 35px;
      width: 35px;
    }
  }
`;

const PromotionDetail = () => {
  const { promotionData, contentToDisplay, termsToDisplay, showJoinButton } =
    usePromotionDetailPage();
  const [contentCollapse, setContentCollapse] = useState(false);

  const isLoading = !promotionData || Object.keys(promotionData).length === 0;

  if (isLoading) {
    return <Loading show={true} />;
  }

  const handleClickCollapse = () => {
    setContentCollapse((prevState) => !prevState);
  };

  return (
    <div>
      <PromotionDetailContainer>
        <BannerWrapper>
          <BannerImage promotionData={promotionData} />
        </BannerWrapper>
        <ContentContainer>
          <TextArea>
            <Title>{promotionData.name}</Title>
            <Description
              dangerouslySetInnerHTML={{
                __html: "<div>" + contentToDisplay + "</div>",
              }}
            />
          </TextArea>
          <TextArea>
            <Title>{i18n.t("promotion.promoDate")}</Title>
            <Description>
              {moment(promotionData.from).format("YYYY/MM/DD HH:mm:ss")} -{" "}
              {moment(promotionData.to).format("YYYY/MM/DD HH:mm:ss")}
            </Description>
          </TextArea>
          <TextArea>
            <TncContainer>
              <Title>{i18n.t("T13.quickLink.tnc")}</Title>
              {contentCollapse ? (
                <img src={cost} alt="cost" onClick={handleClickCollapse} />
              ) : (
                <img src={extend} alt="extend" onClick={handleClickCollapse} />
              )}
            </TncContainer>
            {contentCollapse && (
              <TermsAndConditions
                dangerouslySetInnerHTML={{
                  __html: termsToDisplay,
                }}
              />
            )}
          </TextArea>
        </ContentContainer>
      </PromotionDetailContainer>
      {showJoinButton && (
        <JoinPromotionButtonWrapper>
          <JoinPromotionButton id={promotionData.id} promotionType={promotionData.promotionType} />
        </JoinPromotionButtonWrapper>
      )}
    </div>
  );
};

export default PromotionDetail;

import styled from "styled-components";
import moment from "moment";
import { usePromotionDetailPage } from "@tgs-web-nx/core/hooks";
import BannerImage from "@/pages/promotion/components/BannerImage";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { PromotionPageContainer } from "@/components/styled-component/PageContainer";
import DetailLayout from "@/pages/promotion/components/DetailLayout/DetailLayout";

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
`;
const TextArea = styled.div`
  /* margin-bottom: 40px; */
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 10px;

  ${media.sm} {
    font-size: 2rem;
  }
`;
const Description = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 500;
  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const TermsAndConditions = styled(Description)`
  padding-left: 16px;
  ${media.sm} {
    padding-left: 30px;
  }
`;

const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: 67px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px 40px 22px;
  background: ${({ theme }) => theme.mainBackground};
  ${media.sm} {
    position: relative;
    background: transparent;
  }
`;

const PromotionDetail = () => {
  const { promotionData, contentToDisplay, termsToDisplay, showJoinButton } =
    usePromotionDetailPage();

  const isLoading = !promotionData || Object.keys(promotionData).length === 0;

  if (isLoading) {
    return <Loading show={true} />;
  }

  return (
    <PromotionPageContainer>
      <DetailLayout promotionData={promotionData}>
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
            <Title>Promo Period</Title>
            <Description>
              {moment(promotionData.from).format("YYYY/MM/DD HH:mm:ss")} -{" "}
              {moment(promotionData.to).format("YYYY/MM/DD HH:mm:ss")}
            </Description>
          </TextArea>
          <TextArea>
            <Title>Terms & Conditions</Title>
            <TermsAndConditions
              dangerouslySetInnerHTML={{
                __html: termsToDisplay,
              }}
            />
          </TextArea>
        </ContentContainer>
      </DetailLayout>
    </PromotionPageContainer>
  );
};

export default PromotionDetail;

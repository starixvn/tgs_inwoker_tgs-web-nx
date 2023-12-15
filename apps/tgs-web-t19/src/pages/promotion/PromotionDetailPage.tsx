import styled from "styled-components";
import moment from "moment";
import { usePromotionDetailPage } from "@tgs-web-nx/core/hooks";
import BannerImage from "@/pages/promotion/components/BannerImage";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 12px;
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  flex-shrink: 0;
  background-color: #1F1F1F;

  ${media.sm} {
    width: 1070px;
    margin: 0 auto;
    padding: 46px 46px 60px 46px;
    border-radius: 10px;
    border: 2px solid #B29224;
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
  gap: 32px;
  align-self: stretch;
`;
const TextArea = styled.div`
  /* margin-bottom: 40px; */
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 53px;

  ${media.sm} {
    font-size: 2rem;
  }
`;
const Description = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 400;

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
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    position: relative;
    background: transparent;
    margin-top: 53px;
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
        {showJoinButton && (
          <JoinPromotionButtonWrapper>
            <JoinPromotionButton id={promotionData.id} promotionType={promotionData.promotionType} />
          </JoinPromotionButtonWrapper>
        )}
      </PromotionDetailContainer>
    </div>
  );
};

export default PromotionDetail;

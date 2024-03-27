import styled from "styled-components";
import moment from "moment";
import { usePromotionDetailPage } from "@tgs-web-nx/core/hooks";
import BannerImage from "@/pages/promotion/components/BannerImage";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { PAGE_CONTAINER_WIDTH } from "@/theme/constants";

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  flex-shrink: 0;

  ${media.sm} {
    width: ${PAGE_CONTAINER_WIDTH};
    margin: 0 auto;
    padding: 30px 20px 30px 30px;
    border-radius: 4px;
    position: relative;
  }
`;
const BannerWrapper = styled.div`
  width: 100%;
  height: calc((100vw - 44px) * 0.4);
  ${media.sm} {
    height: unset;
    border-radius: 4px;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  align-self: stretch;
  padding-bottom: 73px;
`;
const TextArea = styled.div`
  /* margin-bottom: 40px; */
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.white};
  font-size: 17px;
  font-weight: 700;
  line-height: 20.57px;
  color: ${({ theme }) => theme.black};
  ${media.sm} {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;
const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  color: ${({ theme }) => theme.grey05};
  ${media.sm} {
    font-size: 1.5rem;
  }
  margin-bottom: 40px;
`;

const TermsAndConditions = styled(Description)`
  ${media.sm} {
    padding-left: 30px;
  }
`;

const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 62.25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    background: transparent;
    position: absolute;
    bottom: 0;
    padding: unset;
    margin-top: 34px;
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
  );
};

export default PromotionDetail;

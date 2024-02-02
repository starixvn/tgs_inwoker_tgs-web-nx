import styled from "styled-components";
import moment from "moment";
import { usePromotionDetailPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { MobileHeader } from "./components/MobileHeader";
import BannerImage from "@/pages/promotion/components/BannerImage";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
  flex-shrink: 0;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
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
`;
const TextArea = styled.div`
  width: 100%;

  & iframe {
    margin: 20px auto 0;
    display: block;
    max-width: 100%;
  }
  & img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.black};
  font-size: .9rem;
  font-weight: 700;
  margin-bottom: 10px;

  ${media.sm} {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.white};
  }
`;
const Description = styled.p`
  color: ${({ theme }) => theme.black};
  font-size: 0.9rem;
  font-weight: 500;
  ${media.sm} {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.white};
  }
`;

const TermsAndConditions = styled(Description)`
  ${media.sm} {
    padding-left: 30px;
  }
`;

const JoinPromotionButtonWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;

  ${media.sm} {
    position: relative;
    background: transparent;
  }
`;


const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.mainBackground};
  overflow-y: auto;

  ${media.sm} {
    background: ${({theme}) => theme.black};
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
    <MainContentWrapper>
      <MobileHeader title="Promotion"/>
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
            <Title>{i18n.t("common.termsAndCondition")}</Title>
            <TermsAndConditions
              dangerouslySetInnerHTML={{
                __html: termsToDisplay,
              }}
            />
          </TextArea>
        </ContentContainer>
      </PromotionDetailContainer>
      {showJoinButton && (
        <JoinPromotionButtonWrapper>
          <JoinPromotionButton id={promotionData.id} promotionType={promotionData.promotionType} />
        </JoinPromotionButtonWrapper>
      )}
    </MainContentWrapper>
  );
};

export default PromotionDetail;

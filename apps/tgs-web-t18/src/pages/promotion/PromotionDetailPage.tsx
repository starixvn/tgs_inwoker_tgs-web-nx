import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { NOT_SHOW_JOIN_BUTTON_KEY_LIST } from "@tgs-web-nx/constants";
import moment from "moment";
import { media } from "@/theme/breakpoints";
import BannerImage from "@/pages/promotion/components/BannerImage";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT, MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 22px 22px 80px 22px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
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
  align-self: stretch;
`;

const TextArea = styled.div`
  position: relative;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.yellow};
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 10px;

  ${media.sm} {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const TermsAndConditions = styled(Description)`
  ol {
    padding-left: 16px;
  }
  ${media.sm} {
    ol {
      padding-left: 30px;
    }
  }
`;

const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: ${MOBILE_BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  ${media.sm} {
    position: relative;
    bottom: 0px;
    background: transparent;
  }
`;

const PromotionDetail = () => {
  const {
    general: {
      promotionList: { items = [] },
    },
  } = useGeneralStore();

  const targetPromotionId = window.location.pathname.split("/")[2]; // TODO: 確定取得方法

  const promotionData = items.find((item: Promotion) => item.id === targetPromotionId) as Promotion;

  if (!promotionData || Object.keys(promotionData).length === 0) return null;

  const isLocalizationHasData = Object.keys(promotionData.localization).length > 0;

  const contentToDisplay =
    (isLocalizationHasData && promotionData.localization[i18n.language].content) ||
    promotionData.content ||
    "";

  const termsToDisplay =
    (isLocalizationHasData && promotionData.localization[i18n.language].terms) ||
    promotionData.terms ||
    "";

  const showJoinButton = !NOT_SHOW_JOIN_BUTTON_KEY_LIST.includes(
    promotionData.promotionType.toUpperCase(),
  );

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

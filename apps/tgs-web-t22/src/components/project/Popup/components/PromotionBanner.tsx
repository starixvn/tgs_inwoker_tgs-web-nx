import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BannerImage from "@/pages/promotion/components/BannerImage";
import { media } from "@/theme/breakpoints";
import { usePromotionData } from "@/hooks/popup/usePromotionData";

const PromotionBannerWrapper = styled.div`
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: auto;
    min-height: 150px;
    object-fit: contain;
  }

  ${media.sm} {
    width: 100%;
    height: calc(100% - 40px);
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;

  ${media.sm} {
    height: auto;
    margin: 10px 0;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.black};
  font-size: 1.062rem;
  font-weight: 700;
  margin: 10px 0;

  ${media.sm} {
    font-size: 1.5rem;
    margin: 0;
    color: ${({ theme }) => theme.white};
  }
`;

const Description = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: .7rem !important;
  max-height: 70px;
  overflow-y: auto;
`;
const PromotionBanner = ({
  handleCloseDialog,
  promotionData,
}: {
  handleCloseDialog: () => void;
  promotionData: Promotion;
}) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { contentToDisplay } = usePromotionData(promotionData);
  
  const handleClickBanner = () => {
    handleCloseDialog();
    history.push("/promotion/" + promotionData.id);
  };

  if (isDesktopSize) {
    return (
      <PromotionBannerWrapper onClick={handleClickBanner}>
        <Title>{promotionData.name}</Title>
        <ImgWrapper>
          <BannerImage promotionData={promotionData} />
        </ImgWrapper>
      </PromotionBannerWrapper>
    );
  }
  return (
    <PromotionBannerWrapper onClick={handleClickBanner}>
      <ImgWrapper>
        <BannerImage promotionData={promotionData} />
      </ImgWrapper>
      <Title>{promotionData.name}</Title>
      <Description
          dangerouslySetInnerHTML={{
            __html: "<div>" + contentToDisplay + "</div>",
          }}
        />
    </PromotionBannerWrapper>
  );
};

export default PromotionBanner;

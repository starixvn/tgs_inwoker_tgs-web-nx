import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import BannerImage from "@/pages/promotion/components/BannerImage";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import usePromotion from "@/core/hooks/tools/usePromotion";
import { Promotion } from "@/core/models/dto/general/GetPromotionListResDto";
import { media } from "@/theme/breakpoints";
import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SubmitButton as Button } from "@/components/styled-component/ProfileForms";
import i18n from "@/utils/i18n";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { usePopup } from "@/core/feature/usePopup";
import { usePromotionData } from "@/hooks/popup/usePromotionData";
const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    max-width: 370px;
    width: 100%;
    height: auto;
    background: ${({ theme }) => theme.mainBackground};
    border-radius: 10px;

    ${media.sm} {
      width: 688px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 36px 24px 18px;
`;

const PromotionBannerWrapper = styled.div`
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: auto;
    min-height: 100px;
    object-fit: contain;
  }

  ${media.sm} {
    width: 688px;
    height: auto;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.yellow};
  font-size: 1.125rem;
  margin: 10px 0;

  ${media.sm} {
    font-size: 2rem;
  }
`;

const Description = styled.div`
  color: #ffffff;
  font-size: 0.875rem !important;
  font-weight: 500;
  max-height: 100px;
  overflow-y: scroll;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;
const PromotionBanner = ({
  handleCloseDialog,
  promotionData,
}: {
  handleCloseDialog: () => void;
  promotionData: Promotion;
}) => {
  const history = useHistory();
  const { contentToDisplay } = usePromotionData(promotionData);

  const handleClickBanner = () => {
    handleCloseDialog();
    history.push("/promotion/" + promotionData.id);
  };
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

const PopupPromotion = () => {
  const { isShowPromotion, handleClosePromotion, needToShowPopupPromotion } = usePopup();
  const { displayPromotionList } = usePromotion();

  const [isCheck, setIsCheck] = useState(false);
  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };
  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowPromotionDialogKey, "true");
    }
    handleClosePromotion();
  };

  if (!needToShowPopupPromotion) return null;

  const isEmptyData = displayPromotionList.length === 0;
  const disableDialog =
    window.sessionStorage && sessionStorage.getItem(doNotShowPromotionDialogKey) === "true";
  if (isEmptyData || disableDialog) return null;

  return (
    <StyledDialog
      open={isShowPromotion}
      TransitionComponent={UpTransition}
      onClose={handleCloseDialog}
    >
      <ChildContainer>
        <Carousel>
          {displayPromotionList.map((promotionData: Promotion) => (
            <PromotionBanner
              key={promotionData.id}
              promotionData={promotionData}
              handleCloseDialog={handleCloseDialog}
            />
          ))}
        </Carousel>
        <NotShowAgainHint
          onClick={handleClickCheckbox}
          isCheck={isCheck}
          style={{
            marginBottom: "18px",
          }}
        />

        <Button
          onClick={handleCloseDialog}
          style={{
            margin: "0 auto",
            width: "90%",
          }}
        >
          <>{i18n.t("common.close")}</>
        </Button>
      </ChildContainer>

      <CloseIcon onClick={handleCloseDialog} />
    </StyledDialog>
  );
};

export default PopupPromotion;

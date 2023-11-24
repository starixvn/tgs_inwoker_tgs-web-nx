import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotion } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import { SubmitButton as Button } from "@/components/styled-component/ProfileForms";
import PromotionBanner from "@/components/project/Popup/components/PromotionBanner";
import PopupHeader from "@/components/project/Popup/components/PopupHeader";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: calc(100vw - 8px);
    height: auto;
    margin: 4px;

    ${media.sm} {
      max-width: 1018px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const MobilePopupPromotion = () => {
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
      <PopupHeader title={i18n.t("web.header.promotion")} handleClose={handleCloseDialog} />

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
        <ContentContainer>
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{
              margin: "10px 0",
            }}
          />

          <Button
            onClick={handleCloseDialog}
            style={{
              margin: "0 auto",
              width: "100%",
            }}
          >
            <>{i18n.t("common.close")}</>
          </Button>
        </ContentContainer>
      </ChildContainer>
    </StyledDialog>
  );
};

export default MobilePopupPromotion;

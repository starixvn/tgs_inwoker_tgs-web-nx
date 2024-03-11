import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotion } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import BannerImage from "@/pages/promotion/components/BannerImage";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/UI/Button";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: 370px;
    //height: 177px;
    border-radius: 10px;

    ${media.sm} {
      width: 688px;
      //height: 465px;
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
  width: 370px;
  height: 177px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media.sm} {
    width: 688px;
    height: 465px;
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

  const handleClickBanner = () => {
    handleCloseDialog();
    history.push("/promotion/" + promotionData.id);
  };
  return (
    <PromotionBannerWrapper onClick={handleClickBanner}>
      <BannerImage promotionData={promotionData} />
    </PromotionBannerWrapper>
  );
};

const PopupPromotion = () => {
  const { isShowPromotion, isOpenAnnouncement, handleClosePromotion, needToShowPopupPromotion } =
    usePopup();
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
      open={isShowPromotion && !isOpenAnnouncement}
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

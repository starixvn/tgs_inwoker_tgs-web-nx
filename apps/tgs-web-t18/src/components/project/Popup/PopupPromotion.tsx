import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { usePromotion } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import IconCloseButton from "@/assets/t18/images/promotion/close_icon.svg";
import TagBg from "@/assets/t18/images/promotion/tag_bg.svg";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import BannerImage from "@/pages/promotion/components/BannerImage";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const DialogPopup = styled(MuiDialog)`
  & .MuiPaper-root {
    max-width: 370px;
    width: 100%;
    height: auto;
    min-height: 100px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 0;
    overflow: visible;
    position: relative;

    ${media.sm} {
      max-width: 688px;
      width: 100%;
      height: auto;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 10px;
`;

const PromotionTag = styled.div`
  width: 213px;
  height: 43px;
  background: url(${TagBg}) no-repeat center center;
  position: absolute;
  top: -10px; // TODO: will hide by parent div: MuiPaper-root
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.div`
  position: fixed;
  z-index: 99;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
  }

  ${media.sm} {
    width: 64px;
    height: 64px;
    margin-top: 29px;
  }
`;

const PromotionBannerWrapper = styled.div`
  width: 370px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
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

const NotShowAgainHintWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  const disableDialog =
    window.sessionStorage && sessionStorage.getItem(doNotShowPromotionDialogKey) === "true";

  const [isCheck, setIsCheck] = useState(false);

  const { displayPromotionList } = usePromotion();

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

  if (isEmptyData || disableDialog) return null;

  return (
    <DialogPopup
      open={isShowPromotion && !isOpenAnnouncement}
      onClose={handleCloseDialog}
      TransitionComponent={UpTransition}
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
        <PromotionTag>PROMOTIONS</PromotionTag>
        <NotShowAgainHintWrapper><NotShowAgainHint onClick={handleClickCheckbox} isCheck={isCheck} /></NotShowAgainHintWrapper>
        <CloseBtn onClick={handleCloseDialog}>
          <img src={IconCloseButton} />
        </CloseBtn>
      </ChildContainer>
    </DialogPopup>
  );
};

export default PopupPromotion;

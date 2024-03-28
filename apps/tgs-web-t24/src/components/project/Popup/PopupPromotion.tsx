import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useDetectDialogClose, usePromotion } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import { Close as CloseIcon } from "@mui/icons-material";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import BannerImage from "@/pages/promotion/components/BannerImage";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    width: 100%;
    max-width: 404px;
    height: auto;
    min-height: 100px;
    background: ${({ theme }) => theme.gray80};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: visible;
    border-radius: 4px;
    padding: 45px 24px 20px 24px;

    ${media.sm} {
      max-width: 534px;
      width: 100%;
      height: auto;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  max-width: 356px;
  height: auto;

  ${media.sm} {
    max-width: 454px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background: rgba(141, 146, 151, 0.3);
`;

const Button = styled.div`
  cursor: pointer;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.white};
  background:${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: auto;
  font-weight: 700;
  line-height: 1.5rem;

  ${media.sm} {
    font-size: 1.25rem;
    width: 281px;
  }
`;

const PromotionBannerWrapper = styled.div`
  width: 356px;
  height: 100%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${media.sm} {
    width: 454px;
    height: 183px;
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
  useDetectDialogClose(isShowPromotion, () => handleClosePromotion());

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
        <ButtonWrapper><Button onClick={handleCloseDialog}>{i18n.t("common.close")}</Button></ButtonWrapper>
      </ChildContainer>

      <NotShowAgainHint
        style={{
          position: "absolute",
          left: "50%",
          top: "100%",
          transform: "translateX(-50%)",
        }}
        onClick={handleClickCheckbox}
        isCheck={isCheck}
      />

      <CloseIconContainer>
        <CloseIcon
          onClick={handleCloseDialog}
          style={{
            color: "#8C9099",
          }}
        />
      </CloseIconContainer>
    </StyledDialog>
  );
};

export default PopupPromotion;

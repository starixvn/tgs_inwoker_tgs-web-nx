import { Dialog as MuiDialog } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Promotion } from "@tgs-web-nx/types";
import { usePromotion } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import IconStarUrl from "@/assets/t23/images/promotion/icon_star.svg";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import PromotionBanner from "@/components/project/Popup/components/PromotionBanner";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    max-width: 370px;
    width: 100%;
    height: auto;
    border-radius: 10px;
    background: transparent;
    box-shadow: none;

    ${media.sm} {
      max-width: 1000px;
      width: 100%;
      height: 600px;
      margin: 0;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 55px 0 0 0;

  ${media.sm} {
    flex-direction: row;
    gap: 20px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 20px;

  ${media.sm} {
    padding: 30px;
  }
`;

const LeftMenuContainer = styled.div`
  width: 320px;
  height: 100%;
  padding: 20px 0;
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 20px;
`;

type PromotionMenuContainerProps = {
  $active: boolean;
};

const PromotionMenuContainer = styled.div<PromotionMenuContainerProps>`
  width: 100%;
  height: 54px;
  padding: 20px;
  overflow: scroll-y;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg, rgba(255, 210, 40, 0.96) 0%, #24262B 46.68%)" : "none"};
`;

const StarIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${IconStarUrl});
  background-size: cover;
  display: inline-block;
`;
const ArrowIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
`;

const PromotionNameWrapper = styled.div`
  padding-left: 15px;
  width: calc(100% - 20px - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PromotionMenu = ({
  promotionData,
  isActive,
  setActivePromotion,
}: {
  promotionData: Promotion;
  isActive: boolean;
  setActivePromotion: (id: string) => void;
}) => {
  const onClick = () => {
    setActivePromotion(promotionData.id);
  };
  return (
    <PromotionMenuContainer $active={isActive} onClick={onClick}>
      <StarIcon />
      <PromotionNameWrapper>{promotionData.name}</PromotionNameWrapper>
      <ArrowIconWrapper>
        <ArrowForwardIosIcon
          style={{
            color: "white",
            width: "100%",
            height: "100%",
          }}
        />
      </ArrowIconWrapper>
    </PromotionMenuContainer>
  );
};

const LeftMenu = ({
  displayPromotionList,
  activePromotionId,
  setActivePromotion,
}: {
  displayPromotionList: Promotion[];
  activePromotionId: string;
  setActivePromotion: (id: string) => void;
}) => {
  return (
    <LeftMenuContainer>
      {displayPromotionList.map((promotionData: Promotion) => {
        const isActive = activePromotionId === promotionData.id;
        return (
          <PromotionMenu
            key={promotionData.id}
            promotionData={promotionData}
            isActive={isActive}
            setActivePromotion={setActivePromotion}
          />
        );
      })}
    </LeftMenuContainer>
  );
};

const PopupPromotion = () => {
  const { isShowPromotion, isOpenAnnouncement, handleClosePromotion, needToShowPopupPromotion } =
    usePopup();
  const { displayPromotionList } = usePromotion();

  const [isCheck, setIsCheck] = useState(false);
  const [activePromotionId, setActivePromotion] = useState<string>("");

  useEffect(() => {
    const noActivePromotionId = !activePromotionId;
    if (displayPromotionList.length > 0 && noActivePromotionId) {
      setActivePromotion(displayPromotionList[0].id);
    }
  }, [displayPromotionList, activePromotionId]);

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

  const activePromotion = displayPromotionList.find(
    (promotion) => promotion.id === activePromotionId,
  ) as Promotion;
  return (
    <StyledDialog
      open={isShowPromotion && !isOpenAnnouncement}
      TransitionComponent={UpTransition}
      onClose={handleCloseDialog}
    >
      <ChildContainer>
        <LeftMenu
          displayPromotionList={displayPromotionList}
          activePromotionId={activePromotionId}
          setActivePromotion={setActivePromotion}
        />

        <ContentContainer>
          {activePromotionId && (
            <PromotionBanner
              key={activePromotionId}
              promotionData={activePromotion}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{
              margin: "10px 0",
              position: "absolute",
              bottom: "10px",
            }}
          />
        </ContentContainer>
      </ChildContainer>

      <CloseIcon onClick={handleCloseDialog} style={{ top: "10px" }} />
    </StyledDialog>
  );
};

export default PopupPromotion;

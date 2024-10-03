import PopupHeader from "@/components/project/Popup/components/PopupHeader";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import { LabelContainer, LabelLargeContainer } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton } from "@/components/UI/Button";
import Carousel from "@/components/UI/Carousel";
import { StyledDialog } from "@/components/UI/Dialog/DialogPopup";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import { useUiStore } from "@tgs-web-nx/core";
import { usePopup } from "@tgs-web-nx/core/features";
import { useDetectDialogClose, useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";


const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
`;

const AnnouncementCardContainer = styled.div`
  height: auto;
  ${media.sm} {
  }
`;

const ButtonWrapper = styled.div`
  ${media.sm} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const AnnouncementCard = ({ subject, content }: { subject: string; content: string }) => {
  return (
    <AnnouncementCardContainer>
      <LabelLargeContainer>{subject}</LabelLargeContainer>
      <LabelContainer>{content}</LabelContainer>
    </AnnouncementCardContainer>
  );
};

const PopupAnnouncement = () => {
  const {
    isOpenAnnouncement,
    handleCloseAnnouncement,
    needToShowPopupAnnouncement,
    handleOpenPromotion,
  } = usePopup();
  useDetectDialogClose(isOpenAnnouncement, () => handleCloseAnnouncement());

  const { isDesktopSize } = useRwd();

  const [isCheck, setIsCheck] = useState(false);
  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };

  const { ui } = useUiStore();
  const { mains: announcementList } = ui;
  const disableDialog =
    window.sessionStorage && sessionStorage.getItem(doNotShowAnnouncementDialogKey) === "true";

  useEffect(() => {
    if (disableDialog) {
      //trigger open promotion dialog
      handleCloseAnnouncement();
    }
  });

  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowAnnouncementDialogKey, "true");
    }
    handleCloseAnnouncement();
    handleOpenPromotion();
  };

  if (!needToShowPopupAnnouncement) return null;

  const isEmptyData = announcementList.length === 0;

  if (isEmptyData || disableDialog) return null;

  return (
    <StyledDialog
      open={isOpenAnnouncement}
      onClose={handleCloseDialog}
      TransitionComponent={UpTransition}
    >
      <PopupHeader title={i18n.t("web.header.announcement")} handleClose={handleCloseDialog} />

      <ChildContainer>
        <Carousel>
          {announcementList
            .sort((a, b) => a.order - b.order)
            .map((announcement, index) => {
              const subject = announcement.localization?.subject || announcement.subject;
              const content = announcement.localization?.content || announcement.content;
              return <AnnouncementCard key={index} subject={subject} content={content} />;
            })}
        </Carousel>

        <NotShowAgainHint onClick={handleClickCheckbox} isCheck={isCheck} />

        <ButtonWrapper>
          <GreenGradientButton
            onClick={handleCloseDialog}
          >
            <>{i18n.t("common.submit")}</>
          </GreenGradientButton>
        </ButtonWrapper>
      </ChildContainer>
    </StyledDialog>
  );
};

export default PopupAnnouncement;

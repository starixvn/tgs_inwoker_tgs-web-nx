import styled from "styled-components";
import { useEffect, useState } from "react";
import { Dialog as MuiDialog } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { useUiStore } from "@tgs-web-nx/core";
import { useDetectDialogClose, useRwd } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import { Close as CloseIcon } from "@mui/icons-material";
import Carousel from "@/components/UI/Carousel";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import { media } from "@/theme/breakpoints";
import { UpTransition } from "@/components/UI/Dialog/Transition";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.gray80};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: visible;
    border-radius: 4px;
    padding: 20px;

    ${media.sm} {
      max-width: 480px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  overflow: auto;
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

const Title = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.white};
  margin-top: 20px;
  white-space: pre-line;
  line-height: 1rem;

  ${media.sm} {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
`;

const Button = styled.div`
  cursor: pointer;
  width: 90%;
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
    font-size: 2rem;
    width: 281px;
    height: 53px;
  }
`;

const AnnouncementCardContainer = styled.div`
  padding: 20px;
  /* height: calc(283px - 52px - 20px - 20px); */
`;

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const AnnouncementCard = ({ subject, content }: { subject: string; content: string }) => {
  return (
    <AnnouncementCardContainer>
      <Title>{subject}</Title>
      <Content>{content}</Content>
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
        <Button onClick={handleCloseDialog}>Got It !</Button>
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
            color: "white",
          }}
        />
      </CloseIconContainer>
    </StyledDialog>
  );
};

export default PopupAnnouncement;

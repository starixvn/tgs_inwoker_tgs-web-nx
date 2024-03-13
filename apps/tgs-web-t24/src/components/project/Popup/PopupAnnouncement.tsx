import styled from "styled-components";
import { useEffect, useState } from "react";
import { Dialog as MuiDialog } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { useUiStore } from "@tgs-web-nx/core";
import { useDetectDialogClose, useRwd } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import Carousel from "@/components/UI/Carousel";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/UI/Button";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: 321px;
    height: 283px;
    border-radius: 10px;

    ${media.sm} {
      width: 652px;
      height: 386px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 36px 24px 18px;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-top: 1rem;
  line-height: 1.2rem;

  ${media.sm} {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
`;

const AnnouncementCardContainer = styled.div`
  padding: 20px;
  height: calc(283px - 52px - 20px - 20px);
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

        {!isDesktopSize && (
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{
              marginBottom: "18px",
            }}
          />
        )}

        <Button
          onClick={handleCloseDialog}
          style={{
            margin: "0 auto",
            width: "90%",
          }}
        >
          <>{i18n.t("common.close")}</>
        </Button>

        {isDesktopSize && (
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{
              margin: "0 auto 18px",
            }}
          />
        )}
      </ChildContainer>

      <CloseIcon onClick={handleCloseDialog} />
    </StyledDialog>
  );
};

export default PopupAnnouncement;

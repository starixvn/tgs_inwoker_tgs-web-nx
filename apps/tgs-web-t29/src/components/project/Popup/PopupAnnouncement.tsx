import styled from "styled-components";
import { useEffect, useState } from "react";
import { Dialog as MuiDialog } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { useUiStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import Carousel from "@/components/UI/Carousel";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import { media } from "@/theme/breakpoints";
import { SubmitButton as Button } from "@/components/styled-component/ProfileForms";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import PopupHeader from "@/components/project/Popup/components/PopupHeader";

const StyledDialog = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: calc(100vw - 10px * 2);
    height: auto;
    margin: 4px;
    overflow: visible;

    ${media.sm} {
      max-width: 478px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;

  ${media.sm} {
    padding: 0 40px 40px;
  }
`;

const Title = styled.div`
  font-size: 1.062rem;
  font-weight: 700;
  color: ${({ theme }) => theme.black};

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  margin-top: 1rem;
  white-space: pre-line;
  ${media.sm} {
    font-size: 1rem;
  }
`;

const AnnouncementCardContainer = styled.div`
  //min-height: 120px;
  height: auto;

  ${media.sm} {
    //min-height: 150px;
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
          <Button
            onClick={handleCloseDialog}
            style={{
              width: isDesktopSize ? "242px" : "100%",
              textAlign: "center",
            }}
          >
            <>{i18n.t("common.close")}</>
          </Button>
        </ButtonWrapper>
      </ChildContainer>
    </StyledDialog>
  );
};

export default PopupAnnouncement;

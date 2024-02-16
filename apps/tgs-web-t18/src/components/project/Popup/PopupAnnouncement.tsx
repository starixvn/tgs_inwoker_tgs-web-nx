import styled from "styled-components";
import { useState } from "react";
import { Dialog as MuiDialog } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useUiStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePopup } from "@tgs-web-nx/core/features";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import NotShowAgainHint from "@/components/project/Popup/NotShowAgainHint";
import mobileBgUrl from "@/assets/t18/images/announcement/mobile_bg.png";
import desktopBgUrl from "@/assets/t18/images/announcement/desktop_bg.png";

const doNotShowAnnouncementDialogKey = "doNotShowAnnouncementDialog";

const DialogContainer = styled(MuiDialog)`
  position: relative;
  & .MuiPaper-root {
    background: url(${mobileBgUrl});
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //width: 321px;
    //height: 283px;
    overflow: visible;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    padding: 20px;

    ${media.sm} {
      //width: 652px;
      //height: 386px;
      background: url(${desktopBgUrl});
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  overflow: auto;
  //height: calc(283px - 20px - 20px);
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  margin-top: 20px;
  line-height: 1.2rem;

  ${media.sm} {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
`;

const Button = styled.div`
  cursor: pointer;
  width: 90%;
  height: 52px;
  text-align: center;
  font-size: 1.6rem;
  color: #ffffff;
  background: #6152dd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: auto;

  ${media.sm} {
    font-size: 2rem;
    width: 281px;
    height: 53px;
  }
`;

const AnnouncementCardContainer = styled.div`
  padding: 20px;
  //height: calc(283px - 52px - 20px - 20px);
`;

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
  const disableDialog =
    window.sessionStorage && sessionStorage.getItem(doNotShowAnnouncementDialogKey) === "true";

  const [isCheck, setIsCheck] = useState(false);

  const { isMobileSize } = useRwd();
  const { ui } = useUiStore();
  const { mains: announcementList } = ui;

  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowAnnouncementDialogKey, "true");
    }
    handleCloseAnnouncement();
    handleOpenPromotion();
  };

  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };

  if (!needToShowPopupAnnouncement) return null;

  const isEmptyData = announcementList.length === 0;

  if (isEmptyData || disableDialog) return null;

  return (
    <DialogContainer
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
        <Button onClick={handleCloseDialog}>Got It!</Button>
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
    </DialogContainer>
  );
};

export default PopupAnnouncement;

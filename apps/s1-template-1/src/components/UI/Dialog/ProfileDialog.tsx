import { CloseIcon } from "@/components/UI/CustomizeIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { media } from "@/theme/breakpoints";
import { DialogProps, Dialog as MuiDialog } from "@mui/material";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const StyledDialog = styled(MuiDialog)`
  margin: .8rem;
  & .MuiPaper-root {
    position: relative;
    background: ${({ theme }) => theme.popupBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    border-radius: 1.6rem;
    width: unset;
    height: unset;
    min-width: 100%;
    ${media.sm} {
      min-width: 40.8rem;
      padding: 3.2rem 3.6rem;
    }
  }
`;

const CloseIconContainer = styled.div`

`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  padding-top: 2.4rem;
`;

const ProfileDialogTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.36px;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
} & DialogProps;

const ProfileDialog = ({ open, onClose, children, ...others }: Props) => {
  const { isDesktopSize } = useRwd();
  const { pageName } = usePageName();

  return (
    <StyledDialog     
      fullScreen={!isDesktopSize}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
      {...others}
    >
      <TitleWrapper>        
        <ProfileDialogTitle>{pageName}</ProfileDialogTitle>
        <CloseIconContainer onClick={onClose}>
        <CloseIcon
        sx={{
          position: "absolute",
          top: "1.9rem",
          right: "2.4rem !important",
          width: "3.2rem",
          height: "3.2rem",
          color: "#324354",
          zIndex: "4",
          cursor: "pointer",
          "&:hover": {
            color: "#6F7E93",
          },
        }}
        viewBox="0 0 33 32"
        className="icon-close"
      />
        </CloseIconContainer>
      </TitleWrapper>
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(ProfileDialog);

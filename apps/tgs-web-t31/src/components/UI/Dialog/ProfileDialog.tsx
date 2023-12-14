import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { theme } from "@/theme";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    background: ${({ theme }) => theme.iconLable};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  padding: 12px 24px;
`;

const ProfileDialogTitle = styled.div`
  margin: 0 auto 18px;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.blue50};
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
      sx={{
        "& .MuiPaper-root": {
          padding: "28px 61px",
          maxWidth: "550px",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.8)",
        },
      }}
      fullScreen={!isDesktopSize}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
      {...others}
    >
      <CloseIconContainer>
        <CloseIcon
          onClick={onClose}
          style={{
            color: theme.text,
            width: "20px",
            height: "20px",
          }}
        />
      </CloseIconContainer>
      <ProfileDialogTitle>{pageName}</ProfileDialogTitle>

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(ProfileDialog);

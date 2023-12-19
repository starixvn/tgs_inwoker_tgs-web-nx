import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import AuthDialogImage from "@/components/UI/Dialog/AuthDialog/components/AuthDialogImage";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { media } from "@/theme/breakpoints";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    background: #1c242c;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 4px;
    //max-width: 871px;
  }
`;

const ChildContainer = styled.div`
  width: 70%;
  border-radius: 20px;
  z-index: 2;

  ${media.md} {
    width: 50%;
  }
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
  showInMobile?: boolean;
} & DialogProps;

const AuthDialog = ({ open, onClose, children, showInMobile, ...others }: Props & DialogProps) => {
  const { isDesktopSize } = useRwd();

  if (!(isDesktopSize || showInMobile)) return null;

  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"md"}
      {...others}
    >
      <CloseIcon onClick={onClose} />

      <AuthDialogImage />
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

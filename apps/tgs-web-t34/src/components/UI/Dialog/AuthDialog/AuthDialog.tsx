import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { usePageName } from "@tgs-web-nx/core/features";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import AuthDialogImage from "@/components/UI/Dialog/AuthDialog/components/AuthDialogImage";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import PopupHeader from "@/components/project/Popup/components/PopupHeader";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    position: relative;
    background: #6401d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.mainBackground};
  z-index: 2;
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
  const { pageName } = usePageName();

  if (!isDesktopSize && !showInMobile) return null;

  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"xs"}
      {...others}
    >
      <PopupHeader title={pageName} handleClose={onClose} />

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

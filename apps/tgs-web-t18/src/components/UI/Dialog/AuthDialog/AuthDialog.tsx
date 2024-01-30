import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import AuthDialogImage from "@/components/UI/Dialog/AuthDialog/components/AuthDialogImage";

const DialogContainer = styled(MuiDialog)`
  & .MuiPaper-root {
    //max-height: 80vh;
    position: relative;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const ChildContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  //max-height: 80vh;

  //& * {
  //  font-size: 0.937rem !important;
  //}
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
};
const AuthDialog = ({ open, onClose, children, ...others }: Props & DialogProps) => {
  const { isDesktopSize } = useRwd();

  if (!isDesktopSize) return null;

  return (
    <DialogContainer
      // fullScreen={!isDesktopSize}
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"md"}
    >
      <AuthDialogImage />
      <ChildContainer>{children}</ChildContainer>
    </DialogContainer>
  );
};

export default React.memo(AuthDialog);

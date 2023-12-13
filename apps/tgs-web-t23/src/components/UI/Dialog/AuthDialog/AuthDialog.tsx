import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import AuthDialogImage from "@/components/UI/Dialog/AuthDialog/components/AuthDialogImage";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    position: relative;
    background: #6401d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 20px;
  z-index: 2;
  overflow: auto;
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
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "490px",
        },
      }}
      {...others}
    >
      <CloseIcon onClick={onClose} />

      <AuthDialogImage />
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

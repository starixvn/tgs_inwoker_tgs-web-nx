import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import React from "react";
import styled from "styled-components";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  .MuiModal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .MuiPaper-root {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 71.8rem;
    width: 100%;
    min-height: 51.5rem;
    margin: 0;
    border-radius: 2.4rem 2.4rem 0 0;
    background: linear-gradient(180deg, #032f63 0%, #111923 50.9%);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.8);

    ${media.sm} {
      position: relative;
      border-radius: 2.4rem;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  padding: 2.4rem;
  margin: 0 auto;
  z-index: 2;
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
  showInMobile?: boolean;
} & DialogProps;

const BetSlipDialog = ({
  open,
  onClose,
  children,
  showInMobile,
  ...others
}: Props & DialogProps) => {
  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"sm"}
      {...others}
    >
      <CloseIcon onClick={onClose} />
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(BetSlipDialog);

import { UpTransition } from "@/components/UI/Dialog/Transition";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { Dialog as MuiDialog } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    background: ${({ theme }) => theme.popupBackground};
    max-width: 48rem;
    border-radius: ${({ theme }) => theme.popupBorderRadius};
    box-shadow: ${({ theme }) => theme.popupShadow};
    margin: 1rem;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogPopup = ({ open, onClose, children }: Props) => {
  return (
    <StyledDialog open={open} onClose={onClose} TransitionComponent={UpTransition}>
      <ChildContainer>{children}</ChildContainer>
      <CloseIcon onClick={onClose} />
    </StyledDialog>
  );
};

export default React.memo(DialogPopup);

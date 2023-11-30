import { Dialog as MuiDialog } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: 321px;
    border-radius: 10px;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 20px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogPopup = ({ open, onClose, children }: Props) => {
  return (
    <StyledDialog open={open} TransitionComponent={UpTransition}>
      <ChildContainer>{children}</ChildContainer>
      <CloseIcon onClick={onClose} />
    </StyledDialog>
  );
};

export default React.memo(DialogPopup);

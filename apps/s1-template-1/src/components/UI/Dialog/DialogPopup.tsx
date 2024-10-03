import { CloseIcon } from "@/components/UI/CustomizeIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    background: ${({ theme }) => theme.popupBackground};
    width: 48rem;
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
        onClick={onClose}
      />
    </StyledDialog>
  );
};

export default React.memo(DialogPopup);

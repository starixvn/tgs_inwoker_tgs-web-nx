import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { theme } from "@/theme";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    background: ${({ theme }) => theme.mainBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  padding: 36px 24px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode
  dialogHeaderTitle?: string;
} & DialogProps;

const Dialog = ({ open, onClose, children, ...others }: Props) => {
  return (
    <StyledDialog open={open} TransitionComponent={UpTransition} onClose={onClose} {...others}>
      <CloseIconContainer>
        <CloseIcon
          onClick={onClose}
          style={{
            color: theme.gray50,
          }}
        />
      </CloseIconContainer>

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default Dialog;

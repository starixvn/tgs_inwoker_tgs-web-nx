import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useAuth } from "@/core/feature/useAuth";

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
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: scroll;
  padding: 21px 22px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  dialogHeaderTitle?: string;
} & DialogProps;
const Dialog = ({ open, onClose, children, ...others }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <StyledDialog
      fullScreen={!isDesktopSize}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      {...others}
    >
      <CloseIconContainer>
        <CloseIcon
          onClick={onClose}
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(Dialog);

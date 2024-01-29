import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";
import iconClose from "@/assets/t18/images/dialog/icon_close.svg";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 4.5px;
  right: 4.5px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  padding: 36px 24px;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
  fullscreenOnMobile?: boolean;
} & DialogProps;

const Dialog = ({ open, onClose, children, fullscreenOnMobile = true, ...others }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <StyledDialog
      fullScreen={!isDesktopSize && !!fullscreenOnMobile}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      {...others}
    >
      <CloseIconContainer onClick={onClose}>
        <Icon iconUrl={iconClose} width={"30px"} height={"30px"} />
      </CloseIconContainer>

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default Dialog;

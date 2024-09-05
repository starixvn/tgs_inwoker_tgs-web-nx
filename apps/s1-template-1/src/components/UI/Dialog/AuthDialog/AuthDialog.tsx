import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 24px 24px 0px 0px;
    background: var(--bg-register, #121b24);
    box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.3);
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: 1.6rem 2.4rem;

    ${media.sm} {
      position: relative;
      border-radius: 24px;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  margin: auto;
  max-height: 910px;
  // background: ${({ theme }) => theme.secBTNBGC};
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

const AuthDialog = ({ open, onClose, children, showInMobile, ...others }: Props & DialogProps) => {
  const { isDesktopSize } = useRwd();

  // if (!(isDesktopSize || showInMobile)) return null;

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

export default React.memo(AuthDialog);

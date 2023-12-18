import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import CloseIcon from "@/components/project/Popup/components/CloseIcon";
import { DIALOG_HEADER_HEIGHT } from "@/components/UI/Dialog/DialogHeader";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    max-width: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  margin: auto;
  max-height: 910px;
  background: ${({ theme }) => theme.mainBackground};
  z-index: 2;
  overflow: auto;
  padding-top: ${DIALOG_HEADER_HEIGHT};

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }
`;

const AuthHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.primary};
  height: ${DIALOG_HEADER_HEIGHT};
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  padding: 12px 22px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.white};
  font-weight: 700;
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
  const { pageName } = usePageName();

  if (!(isDesktopSize || showInMobile)) return null;

  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"sm"}
      {...others}
    >
      <AuthHeader>
        {pageName}
        <CloseIcon onClick={onClose} />
      </AuthHeader>
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

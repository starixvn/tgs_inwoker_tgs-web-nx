import { CloseIcon } from "@/components/UI/CustomizeIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
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
    background: ${({ theme }) => theme.dialogBackground};
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.8);

    ${media.sm} {
      position: relative;
      border-radius: 2.4rem;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
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
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

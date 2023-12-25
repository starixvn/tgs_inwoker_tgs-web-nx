import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import closeImg from "@/assets/t30/images/dialog/icon-close-blue.svg";
import Icon from "@/components/project/Icon";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  & .MuiPaper-root {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  max-height: 910px;
  background: ${({ theme }) => theme.white};
  z-index: 2;
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

  if (!(isDesktopSize || showInMobile)) return null;

  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"xs"}
      {...others}
    >
      <Icon
        iconUrl={closeImg}
        width={"20px"}
        height={"20px"}
        onClick={onClose}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          cursor: "pointer",
          zIndex: 3,
        }}
      />
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(AuthDialog);

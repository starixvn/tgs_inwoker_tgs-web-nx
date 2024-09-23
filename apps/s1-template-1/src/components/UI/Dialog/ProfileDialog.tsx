import Icon from "@/components/project/Icon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { DialogProps, Dialog as MuiDialog } from "@mui/material";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const StyledDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    position: relative;
    background: ${({ theme }) => theme.popupBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3.2rem 3.6rem;
    min-width: 40.8rem;
    border-radius: 1.6rem;
  }
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  padding-top: 2.4rem;
`;

const ProfileDialogTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.36px;
  text-align: left;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogHeaderTitle?: string;
} & DialogProps;

const ProfileDialog = ({ open, onClose, children, ...others }: Props) => {
  const { isDesktopSize } = useRwd();
  const { pageName } = usePageName();

  return (
    <StyledDialog
      sx={{
        "& .MuiPaper-root": {
        },
        "& .MuiBackdrop-root": {
          
        },
      }}
      fullScreen={!isDesktopSize}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
      {...others}
    >
      <CloseIconContainer onClick={onClose}>
        <Icon iconUrl="/assets/images/common/icon-close.svg"/>
      </CloseIconContainer>
      <ProfileDialogTitle>{pageName}</ProfileDialogTitle>

      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(ProfileDialog);

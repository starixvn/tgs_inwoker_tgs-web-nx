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
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      fullScreen={!isDesktopSize}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
      {...others}
    >
      <TitleWrapper>        
        <ProfileDialogTitle>{pageName}</ProfileDialogTitle>
        <CloseIconContainer onClick={onClose}>
          <Icon iconUrl="/assets/images/common/icon-close.svg"/>
        </CloseIconContainer>
      </TitleWrapper>
      <ChildContainer>{children}</ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(ProfileDialog);

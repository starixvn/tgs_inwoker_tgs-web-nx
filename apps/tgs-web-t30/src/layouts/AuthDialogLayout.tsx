import React from "react";
import styled from "styled-components";
import { useAuthDialogLayout, useRwd } from "@tgs-web-nx/core/hooks";
import { Close as CloseIcon } from "@mui/icons-material";
import DefaultLayout from "@/layouts/DefaultLayout";
import { HEADER_HEIGHT } from "@/theme/constants";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  height: 100vh;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  margin: ${HEADER_HEIGHT} 0 0;
  position: relative;
  z-index: 1;
`;

const CloseIconContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ theme }) => theme["515c"]};
`;

type Props = {
  children: React.ReactNode;
};
const AuthDialogLayout = ({ children }: Props) => {
  const { handleCloseDialog } = useAuthDialogLayout();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <CloseIconContainer onClick={handleCloseDialog}>
        <CloseIcon
          style={{
            color: "white",
          }}
        />
      </CloseIconContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

import React, { ReactElement, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Close as CloseIcon } from "@mui/icons-material";
import DefaultLayout from "@/layouts/DefaultLayout";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryLight};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${MOBILE_BOTTOM_APP_BAR_HEIGHT});
  margin: ${MOBILE_HEADER_HEIGHT} 0 ${MOBILE_BOTTOM_APP_BAR_HEIGHT};
  position: relative;
  z-index: 1;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  children: ReactElement;
};
const AuthDialogLayout = ({ children }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { isDesktopSize } = useRwd();

  const pathname = location.pathname;
  const handleCloseDialog = useCallback(() => {
    const profileRegex = /\/profile\//;
    if (profileRegex.test(pathname)) {
      return history.push("/profile");
    }

    if (pathname === "/profile") {
      return history.push("/account");
    }

    history.push("/");
  }, [pathname]);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <CloseIconContainer onClick={handleCloseDialog}>
        <CloseIcon
          style={{
            color: "white",
            transform: "scale(1.6)",
          }}
        />
      </CloseIconContainer>
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

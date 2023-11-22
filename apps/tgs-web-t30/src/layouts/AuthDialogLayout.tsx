import { ReactElement, useCallback } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Close as CloseIcon } from "@mui/icons-material";
import DefaultLayout from "@/layouts/DefaultLayout";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
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
          }}
        />
      </CloseIconContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

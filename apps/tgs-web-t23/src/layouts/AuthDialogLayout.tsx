import { Close as CloseIcon } from "@mui/icons-material";
import { ReactElement, useCallback } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { HEADER_HEIGHT } from "@/theme/constants";
import { useRwd } from "@/core/hooks/tools/useRwd";
import DefaultLayout from "@/layouts/DefaultLayout";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  height: 100vh;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  // min-height: calc(100vh - ${HEADER_HEIGHT}); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 0;
  position: relative;
  z-index: 1;
`;

const CloseIconContainer = styled.div`
  position: fixed;
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
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

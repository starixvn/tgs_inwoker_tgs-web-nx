import { ReactElement } from "react";
import styled from "styled-components";
import { HEADER_HEIGHT } from "@/theme/constants";
import { useRwd } from "@/core/hooks/tools/useRwd";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthDialogHeader from "@/layouts/components/AuthDialogHeader";

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

type Props = {
  children: ReactElement;
};
const AuthDialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <AuthDialogHeader />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

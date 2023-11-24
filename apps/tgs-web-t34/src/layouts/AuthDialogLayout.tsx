import { ReactElement } from "react";
import styled from "styled-components";
import { useAuthDialogLayout, useRwd } from "@tgs-web-nx/core/hooks";
import DefaultLayout from "@/layouts/DefaultLayout";
import DialogHeader from "@/layouts/components/DialogHeader";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  height: 100vh;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
};
const AuthDialogLayout = ({ children }: Props) => {
  const { handleCloseDialog } = useAuthDialogLayout();

  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

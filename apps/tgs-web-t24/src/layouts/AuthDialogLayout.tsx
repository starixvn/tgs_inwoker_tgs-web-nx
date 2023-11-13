import { ReactElement } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthDialogHeaderForMobile from "@/layouts/components/AuthDialogHeaderForMobile";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: #1c242c;
  height: 100vh;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  //margin: 80px 0 0;
  margin-top: 60px;
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
      <AuthDialogHeaderForMobile />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

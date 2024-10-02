import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";
import { media } from "@/theme/breakpoints";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";
import Header from "./components/Header";

const DialogLayoutContainer = styled.div`
  position: relative;
`;

const ContentWrapper = styled.div`
  margin: calc(${`${MOBILE_HEADER_HEIGHT}) auto 0`};
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-bottom: 10rem;
  ${media.sm} {
     min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
  }
`;

const DockHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${MOBILE_HEADER_HEIGHT};
  z-index: 1300;
`;

const AccountHeader = styled.div`
  height: ${MOBILE_HEADER_HEIGHT};
`;




type Props = {
  children: React.ReactNode;
};
const DialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DockHeader>
        <AccountHeader><Header /></AccountHeader>        
      </DockHeader>
      <ContentWrapper>{children}</ContentWrapper>
      {/* <BottomAppBar /> */}
    </DialogLayoutContainer>
  );
};

export default DialogLayout;

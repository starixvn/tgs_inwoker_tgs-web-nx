import React from "react";
import styled from "styled-components";
import { useAuthDialogLayout, useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/theme/constants";
import bg from "@/assets/t21/images/loginBG.png";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";

// const DefaultLayoutContainer = styled.div`
//   position: relative;
//   background: url(${bg});
// `;

// const DashboardContainer = styled.div`
//   display: flex;
//   margin-top: ${MOBILE_HEADER_HEIGHT};
//   min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});

//   ${media.sm} {
//     margin-top: ${DESKTOP_HEADER_HEIGHT};
//     min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
//     margin-bottom: unset;
//   }
// `;

// const ContentWrapper = styled.div`
//   position: relative;
//   flex-grow: 1;
//   transition: all ease-in-out 0.2s;
// `;

// const ChildrenWrapper = styled.div`
//   padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};

//   ${media.sm} {
//     padding-bottom: 0;
//   }
// `;

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  /* height: 100vh;
  overflow: auto; */
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${MOBILE_HEADER_HEIGHT} 0 ${BOTTOM_APP_BAR_HEIGHT};
  position: relative;
  z-index: 1;

  ${media.sm} {
    height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin: ${DESKTOP_HEADER_HEIGHT} 0 0;
  }
`;

type Props = {
  children: React.ReactNode;
};
const AuthDialogLayout = ({ children }: Props) => {
  const { isMobileSize } = useRwd();
  const { handleCloseDialog } = useAuthDialogLayout();
  const { pageName } = usePageName();
  const { isDesktopSize } = useRwd();

  return (
    // <DefaultLayoutContainer>
    //   <Header />

    //   <DashboardContainer>
    //     <ContentWrapper>
    //       <>
    //         <MenuDrawer />
    //         <ChildrenWrapper>{children}</ChildrenWrapper>
    //         <Footer />
    //       </>
    //     </ContentWrapper>
    //   </DashboardContainer>

    //   {isMobileSize && <BottomAppBar />}
    // </DefaultLayoutContainer>
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;

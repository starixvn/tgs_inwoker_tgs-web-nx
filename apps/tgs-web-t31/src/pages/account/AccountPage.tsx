import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Drawer } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import AccountMenu from "./components/AccountMenu";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import { theme } from "@/theme";
import Slider from "@/pages/home/components/Slider";

const SliderWrapper = styled.div`
  width: 100%;
  height: 160px;
`;
const AccountPage = () => {
  useUpdatePageName(i18n.t("TIGER.my"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <PageContainer>
      {isDesktopSize ? (
        <UserWalletInfo />
      ) : (
        <>
          <SliderWrapper>
            <Slider />
          </SliderWrapper>
          <Drawer
            variant={"temporary"}
            anchor={"bottom"}
            open={true}
            onClose={() => {}}
            sx={{
              flexShrink: 0,
              height: `calc(100vh - ${BOTTOM_APP_BAR_HEIGHT})`,
              zIndex: "999",
              "& .MuiBackdrop-root": {
                height: `calc(100vh - ${BOTTOM_APP_BAR_HEIGHT})`,
                marginBottom: BOTTOM_APP_BAR_HEIGHT,
              },
              "& .MuiDrawer-paper": {
                marginBottom: BOTTOM_APP_BAR_HEIGHT,
                transition: "all ease-in-out 0.2s",
                border: "none",
                background: theme.mainBackground,
              },
            }}
          >
            <AccountMenu />
          </Drawer>
        </>
      )}
      {/* {!isDesktopSize && <MemberCenterBorder />} */}
      {/* <AccountNavigations /> */}
    </PageContainer>
  );
};

export default AccountPage;

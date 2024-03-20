import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import AccountNavigations from "./components/AccountNavigations";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import MemberCenterBorder from "@/pages/account/components/MemberCenterBorder";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { media } from "@/theme/breakpoints";

export const AccountPageContainer = styled.div`
  background: rgba(0, 0, 0, 1);
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const AccountPage = () => {
  useUpdatePageName(i18n.t("TIGER.my"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize, isMobileSize } = useRwd();

  if (isDesktopSize) {
    history.push("/profile");
  }

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <AccountPageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {/* {isMobileSize && <MemberCenterBorder />} */}
      <AccountNavigations />
    </AccountPageContainer>
  );
};

export default AccountPage;

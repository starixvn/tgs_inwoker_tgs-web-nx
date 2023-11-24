import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useUpdatePageName } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import AccountNavigations from "./components/AccountNavigations";
import InfoCard from "@/pages/account/components/InfoCard";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { media } from "@/theme/breakpoints";

const AccountPageContainer = styled.div`
  background: ${({ theme }) => theme.gray20};
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: 0 auto;
  padding-bottom: 50px;

  ${media.sm} {
    padding-bottom: 0;
  }
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
    <AccountPageContainer>
      {isDesktopSize ? <UserWalletInfo /> : <InfoCard style={{ marginBottom: "10px" }} />}
      <AccountNavigations />
    </AccountPageContainer>
  );
};

export default AccountPage;

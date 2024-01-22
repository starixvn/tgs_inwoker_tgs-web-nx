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
import { PageContainer } from "@/components/styled-component/PageContainer";

const AccountPage = () => {
  useUpdatePageName(i18n.t("TIGER.my"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    history.push("/profile");
  }

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <PageContainer>
      {isDesktopSize ? <UserWalletInfo /> : <InfoCard style={{ marginBottom: "10px" }} />}
      <AccountNavigations />
    </PageContainer>
  );
};

export default AccountPage;

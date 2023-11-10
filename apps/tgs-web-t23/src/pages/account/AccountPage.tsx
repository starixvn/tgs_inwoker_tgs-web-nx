import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import AccountNavigations from "./components/AccountNavigations";
import InfoCard from "@/pages/account/components/InfoCard";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useAuth } from "@/core/feature/useAuth";
import MemberCenterBorder from "@/pages/account/components/MemberCenterBorder";
import { PageContainer } from "@/components/styled-component/PageContainer";

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
      {isDesktopSize ? <UserWalletInfo /> : <InfoCard style={{ marginBottom: "50px" }} />}
      {!isDesktopSize && <MemberCenterBorder />}
      <AccountNavigations />
    </PageContainer>
  );
};

export default AccountPage;

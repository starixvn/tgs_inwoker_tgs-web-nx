import Affiliate from "@/components/account/Affiliate";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";

const AffiliatePage = () => {
  useUpdatePageName(i18n.t("affiliate.title"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <MenuTabs />}

      <AccountPaper pageName={i18n.t("affiliate.title")} iconUrl={""}>
        <Affiliate />
      </AccountPaper>
    </PageContainer>
  );
};

export default AffiliatePage;

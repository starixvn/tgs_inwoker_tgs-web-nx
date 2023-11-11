import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import Affiliate from "@/core/components/Affiliate";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { PageContainer } from "@/components/styled-component/PageContainer";

const AffiliatePage = () => {
  useUpdatePageName(i18n.t("affiliate.title"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("affiliate.title")} iconUrl={iconAffiliate}>
        <Affiliate />
      </AccountPaper>
    </PageContainer>
  );
};

export default AffiliatePage;

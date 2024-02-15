import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Affiliate from "@/components/account/Affiliate";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconAffiliate from "@/assets/t26/images/account/navItem/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const AffiliatePage = () => {
  useUpdatePageName(i18n.t("affiliate.title"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      {isDesktopSize && <PageBadge iconUrl={iconAffiliate} text={i18n.t("affiliate.title")} />}

      <AccountPaper>
        <Affiliate />
      </AccountPaper>
    </PageContainer>
  );
};

export default AffiliatePage;

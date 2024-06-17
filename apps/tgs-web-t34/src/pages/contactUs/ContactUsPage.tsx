import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Support from "@/components/account/Support";
import iconAffiliate from "@/assets/t34/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));

  return (
    <AccountPaper pageName={i18n.t("common.contactus")} iconUrl={iconAffiliate}>
      <PageContainer>
        <Support />
      </PageContainer>
    </AccountPaper>
  );
};

export default ContactUsPage;

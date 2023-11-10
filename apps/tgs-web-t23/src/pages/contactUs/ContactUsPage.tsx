import React from "react";
import i18n from "@/utils/i18n";
import Support from "@/core/components/Support";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
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

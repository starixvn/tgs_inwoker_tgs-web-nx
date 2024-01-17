import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";
import iconContact from "@/assets/t26/images/account/navItemWhite/icon-contact.svg";
import AccountPaper from "@/components/project/AccountPaper";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));

  return (
    <PageContainer>
      <AccountPaper pageName={i18n.t("common.contactus")}iconUrl={iconContact}>
        <Support />
      </AccountPaper>
    </PageContainer>
  );
};

export default ContactUsPage;

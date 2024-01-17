import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";
import iconContact from "@/assets/t25/images/account/navItem/icon-contact.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.contactus")} iconUrl={iconContact}>
        <Support />
      </AccountPaper>
    </PageContainer>
  );
};

export default ContactUsPage;

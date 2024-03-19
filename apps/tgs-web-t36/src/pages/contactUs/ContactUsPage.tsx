import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import AccountPaper from "@/components/project/AccountPaper";

const ContactUsPage = () => {
  const { isDesktopSize } = useRwd();
  useUpdatePageName(i18n.t("common.contactus"));

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <Support />
    </PageContainer>
  );
};

export default ContactUsPage;

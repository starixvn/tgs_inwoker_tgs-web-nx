import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";
import iconContact from "@/assets/t26/images/account/navItemWhite/icon-contact.svg";
import AccountPaper from "@/components/project/AccountPaper";
import PageBadge from "@/components/project/AccountPaper/components/PageBadge";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <PageBadge iconUrl={iconContact} text={i18n.t("common.contactus")} />}
      <AccountPaper>
        <Support />
      </AccountPaper>
    </PageContainer>
  );
};

export default ContactUsPage;

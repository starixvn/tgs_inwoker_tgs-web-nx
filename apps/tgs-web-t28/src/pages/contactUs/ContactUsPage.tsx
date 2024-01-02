import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";
import MenuTabs from "@/components/project/MenuTabs";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <MenuTabs />}
      <Support />
    </PageContainer>
  );
};

export default ContactUsPage;

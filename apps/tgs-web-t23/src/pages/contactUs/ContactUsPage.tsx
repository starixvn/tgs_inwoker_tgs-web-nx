import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import Support from "@/core/components/Support";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";

const ContactUsContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));

  return (
    <AccountPaper pageName={i18n.t("common.contactus")} iconUrl={iconAffiliate}>
      <ContactUsContainer>
        <Support />
      </ContactUsContainer>
    </AccountPaper>
  );
};

export default ContactUsPage;

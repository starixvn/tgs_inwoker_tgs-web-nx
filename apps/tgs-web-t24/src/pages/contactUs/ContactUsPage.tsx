import React from "react";
import i18n from "@/utils/i18n";
import Support from "@/core/components/Support";
import styled from "styled-components";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";

const ContactUsContainer = styled.div`
  padding: 0 22px;
  max-width: calc(1072px + 22px * 2);
  margin: auto;
`;

type Props = {};
const ContactUsPage = (props: Props) => {
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

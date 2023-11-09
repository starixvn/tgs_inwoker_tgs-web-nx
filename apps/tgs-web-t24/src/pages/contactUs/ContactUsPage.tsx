import styled from "styled-components";
import iconAffiliate from "@/assets/t23/images/badge/icon-affiliate.svg";
import AccountPaper from "@/components/project/AccountPaper";
import Support from "@/core/components/Support";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";

const ContactUsContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
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

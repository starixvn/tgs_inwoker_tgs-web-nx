import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import Support from "@/components/account/Support";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ContactUsPage = () => {
  useUpdatePageName(i18n.t("common.contactus"));

  return (
    <PageContainer>
      <Support />
    </PageContainer>
  );
};

export default ContactUsPage;

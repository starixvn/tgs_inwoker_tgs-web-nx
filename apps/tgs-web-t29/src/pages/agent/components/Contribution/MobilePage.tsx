import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import Contribution from "./index";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ContributionPage = () => {
  useUpdatePageName("代理貢獻");
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    history.push("/agent");
  }

  return (
    <PageContainer>
      <Contribution />
    </PageContainer>
  );
};

export default ContributionPage;

import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import WinlossReport from "./index";
import { PageContainer } from "@/components/styled-component/PageContainer";

const WinlossReportPage = () => {
  useUpdatePageName(i18n.t("agent.winlossReport"));
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    history.push("/agent");
  }

  return (
    <PageContainer>
      <WinlossReport />
    </PageContainer>
  );
};

export default WinlossReportPage;

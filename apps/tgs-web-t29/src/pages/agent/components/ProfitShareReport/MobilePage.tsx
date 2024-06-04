import { useEffect } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useUpdatePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router";
import ProfitShareReport from "./index";
import { PageContainer } from "@/components/styled-component/PageContainer";

const ProfitShareReportPage = () => {
  useUpdatePageName(i18n.t("agent.profitShareReport"));
  const history = useHistory();

  const { isDesktopSize } = useRwd();
  useEffect(() => {
    if (isDesktopSize) {
      history.push("/agent");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <ProfitShareReport />
    </PageContainer>
  );
};

export default ProfitShareReportPage;

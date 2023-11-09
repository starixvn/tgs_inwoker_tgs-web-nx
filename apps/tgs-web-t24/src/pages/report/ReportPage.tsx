import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iconReport from "@/assets/t23/images/badge/icon-report.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Report from "@/core/components/Report";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";

const ReportContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

type Props = {};
const ReportPage = (props: Props) => {
  useUpdatePageName(i18n.t("affiliate.report"));

  const { alert } = useNotifications();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  return (
    <ReportContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        {/*@ts-ignore*/}
        <Report alert={alert} history={history} />
      </AccountPaper>
    </ReportContainer>
  );
};

export default ReportPage;

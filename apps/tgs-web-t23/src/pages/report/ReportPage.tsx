import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Report from "@/core/components/Report";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconReport from "@/assets/t23/images/badge/icon-report.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const ReportContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

const ReportPage = () => {
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

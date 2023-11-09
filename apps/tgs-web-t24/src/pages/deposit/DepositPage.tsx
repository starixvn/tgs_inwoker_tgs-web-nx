import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import DepositPrev from "@/core/components/DepositPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";

const DepositContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;

const DepositPage = () => {
  useUpdatePageName(i18n.t("common.deposit"));

  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation<{ order?: string }>();
  const { isDesktopSize } = useRwd();
  const order = location.state?.order || null;

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositPrev appHistory={history} alert={alert} order={order} />
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositPage;

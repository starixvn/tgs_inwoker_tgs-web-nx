import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Manual from "@/core/components/DepositPrev/Manual";
import { useNotifications } from "@/core/feature/useNotifications";
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

const DepositManualPage = () => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <Manual appHistory={history} alert={alert} />
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositManualPage;

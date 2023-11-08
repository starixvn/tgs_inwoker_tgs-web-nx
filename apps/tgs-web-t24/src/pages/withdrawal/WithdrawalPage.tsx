import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import WithdrawalPrev from "@/core/components/WithdrawalPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const WithdrawalContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;

type Props = {};
const Withdrawal = (props: Props) => {
  useUpdatePageName(i18n.t("common.withdrawal"));

  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <WithdrawalContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <WithdrawalPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </WithdrawalContainer>
  );
};

export default Withdrawal;

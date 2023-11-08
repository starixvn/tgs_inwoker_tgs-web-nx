import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Details from "@/core/components/WithdrawalPrev/Details";
import { useNotifications } from "@/core/feature/useNotifications";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const WithdrawalDetailContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

type Props = {};
const WithdrawalDetails = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation<{ order?: string }>();
  const order = location.state?.order || null;
  const { isDesktopSize } = useRwd();

  return (
    <WithdrawalDetailContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <Details appHistory={history} alert={alert} order={order} />
      </AccountPaper>
    </WithdrawalDetailContainer>
  );
};

export default WithdrawalDetails;

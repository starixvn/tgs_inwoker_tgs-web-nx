import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Details from "@/core/components/DepositPrev/Details";
import { useNotifications } from "@/core/feature/useNotifications";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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

type Props = {};
const DepositDetailsPage = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        {/*@ts-ignore*/}
        <Details appHistory={history} alert={alert} />
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositDetailsPage;

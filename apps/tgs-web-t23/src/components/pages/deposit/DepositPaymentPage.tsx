import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import styled from "styled-components";
import Payment from "@/core/components/DepositPrev/Payment";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";

const DepositContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;

type Props = {};
const DepositPaymentPage = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        {/*@ts-ignore*/}
        <Payment appHistory={history} alert={alert} />
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositPaymentPage;

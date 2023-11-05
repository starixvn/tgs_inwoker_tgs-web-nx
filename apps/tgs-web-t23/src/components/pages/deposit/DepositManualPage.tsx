import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import styled from "styled-components";
import Manual from "@/core/components/DepositPrev/Manual";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useRwd } from "@/core/hooks/tools/useRwd";

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
const DepositManualPage = (props: Props) => {
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

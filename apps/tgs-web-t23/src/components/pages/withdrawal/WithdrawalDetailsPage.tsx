import React from "react";
import { useHistory } from "react-router";
import { useNotifications } from "@/core/feature/useNotifications";
import styled from "styled-components";
import Details from "@/core/components/WithdrawalPrev/Details";
import { useLocation } from "react-router";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";

const WithdrawalDetailContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
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

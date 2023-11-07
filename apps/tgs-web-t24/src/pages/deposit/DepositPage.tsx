import React from "react";
import DepositPrev from "@/core/components/DepositPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconDeposit from "@/assets/t23/images/badge/icon-deposit.svg";
import i18n from "@/utils/i18n";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const DepositContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1072px + 22px * 2);
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;

type Props = {};
const DepositPage = (props: Props) => {
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

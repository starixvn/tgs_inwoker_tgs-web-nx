import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TransferPrev from "@/core/components/TransferPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import i18n from "@/utils/i18n";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconTransfer from "@/assets/t23/images/badge/icon-transfer.svg";
import { useRwd } from "@/core/hooks/tools/useRwd";
import AccountPaper from "@/components/project/AccountPaper";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

const TransferContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

type Props = {};
const Transfer = (props: Props) => {
  useUpdatePageName(i18n.t("transfer.title"));
  const { isDesktopSize } = useRwd();

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <TransferContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.transfer")} iconUrl={iconTransfer}>
        <TransferPrev alert={alert} history={history} />
      </AccountPaper>
    </TransferContainer>
  );
};

export default Transfer;

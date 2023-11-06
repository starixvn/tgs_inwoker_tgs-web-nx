import React from "react";
import CardPrev from "@/core/components/CardPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/core/feature/useNotifications";
import styled from "styled-components";
import { useRwd } from "@/core/hooks/tools/useRwd";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { useNavigation } from "@/core/hooks/tools/pageProps/useNavigation";

const CardContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: auto;
`;

const CardPage = () => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { navigate } = useNavigation();
  const { isDesktopSize } = useRwd();

  return (
    <CardContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <CardPrev appHistory={history} alert={alert} navigate={navigate} />
      </AccountPaper>
    </CardContainer>
  );
};

export default CardPage;

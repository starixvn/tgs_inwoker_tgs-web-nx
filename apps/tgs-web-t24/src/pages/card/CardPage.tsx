import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNavigation, useRwd } from "@tgs-web-nx/core/hooks";
import { useNotifications } from "@tgs-web-nx/core/features";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import CardPrev from "@/core/components/CardPrev";
import { PageContainer } from "@/components/styled-component/PageContainer";

const CardPage = () => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { navigate } = useNavigation();
  const { isDesktopSize } = useRwd();

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <CardPrev appHistory={history} alert={alert} navigate={navigate} />
      </AccountPaper>
    </PageContainer>
  );
};

export default CardPage;

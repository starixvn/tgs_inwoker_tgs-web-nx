import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import CardPrev from "@/core/components/CardPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useNavigation } from "@/core/hooks/tools/pageProps/useNavigation";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";

const CardContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

type Props = {};
const CardPage = (props: Props) => {
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

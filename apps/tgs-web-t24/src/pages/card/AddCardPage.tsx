import iconWithdrawal from "@/assets/t23/images/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import AddCardPrev from "@/core/components/CardPrev/AddCardPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

type Props = {};
const AddCardPage = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <CardContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("common.withdrawal")} iconUrl={iconWithdrawal}>
        <AddCardPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </CardContainer>
  );
};

export default AddCardPage;

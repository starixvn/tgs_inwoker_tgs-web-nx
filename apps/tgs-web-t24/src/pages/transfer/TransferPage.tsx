import { useHistory } from "react-router-dom";
import styled from "styled-components";
import iconTransfer from "@/assets/t23/images/badge/icon-transfer.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import TransferPrev from "@/core/components/TransferPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";

const TransferContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
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

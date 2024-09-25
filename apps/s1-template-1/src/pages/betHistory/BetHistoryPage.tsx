import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { TransferPageContainer } from "@/components/styled-component/PageContainer";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const Text = styled.div`
  color: white;
`;
const BetHistoryPage = () => {
  const { isDesktopSize } = useRwd();
    return (
      <TransferPageContainer>
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("common.betHistory")} iconUrl="" >
        <Text>Bet History Page</Text>
        {/* <DepositPrev appHistory={history} alert={alert} /> */}
      </AccountPaper>
    </TransferPageContainer>
    );
  };
  
  export default BetHistoryPage;
  
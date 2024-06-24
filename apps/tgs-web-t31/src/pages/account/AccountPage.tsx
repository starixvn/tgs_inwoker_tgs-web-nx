import  { useEffect } from "react";
import DynamicFont from "react-dynamic-font";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useUpdatePageName, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useGameStore } from "@tgs-web-nx/core";
import AccountNavigations from "./components/AccountNavigations";
import InfoCard from "@/pages/account/components/InfoCard";
import { PageContainer } from "@/components/styled-component/PageContainer";
import UserWalletInfo, {
  AmountContainer,
  MainAccountLabel,
  MainWalletContainer,
  RefreshButton,
  WalletsWrapper,
} from "@/components/project/UserWalletInfo";
import refreshIcon from "@/assets/t31/images/account/icon-refresh.svg";

const AccountPage = () => {
  useUpdatePageName(i18n.t("TIGER.my"));
  const {
    mainSymbol,
    mainWalletBalance,
    transferWalletBalance,
    fetchMainWalletBalance,
    fetchTransferWalletBalance,
    fetchBalance,
    isMainWalletLoading,
    isTransferWalletLoading,
  } = useUserWalletInfoContext();
  const { game } = useGameStore();

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <PageContainer>
      {isDesktopSize ? (
        <UserWalletInfo />
      ) : (
        <>
          <InfoCard style={{ marginBottom: "20px" }} />
          <WalletsWrapper style={{ marginBottom: "20px" }}>
            <MainWalletContainer>
              <MainAccountLabel>{i18n.t("web.account.header.mainWallet")}</MainAccountLabel>
              <AmountContainer>
                {isMainWalletLoading ? (
                  <span>-</span>
                ) : (
                  <DynamicFont
                    content={mainSymbol + Common.formatNumberWithThousand(mainWalletBalance)}
                  />
                )}
                <RefreshButton
                  width={"44px"}
                  height={"44px"}
                  iconUrl={refreshIcon}
                  onClick={fetchMainWalletBalance}
                  $isLoading={isMainWalletLoading}
                />
              </AmountContainer>
            </MainWalletContainer>
            {game.containTransferWallet && (
              <MainWalletContainer>
                <MainAccountLabel>{i18n.t("web.account.header.allGameWallet")}</MainAccountLabel>
                <AmountContainer>
                  {isTransferWalletLoading ? (
                    <span>-</span>
                  ) : (
                    <DynamicFont content={mainSymbol + transferWalletBalance.toFixed(2)} />
                  )}
                  <RefreshButton
                    width={"44px"}
                    height={"44px"}
                    iconUrl={refreshIcon}
                    onClick={fetchTransferWalletBalance}
                    $isLoading={isTransferWalletLoading}
                  />
                </AmountContainer>
              </MainWalletContainer>
            )}
            <MainWalletContainer>
              <MainAccountLabel>{i18n.t("web.account.header.total")}</MainAccountLabel>
              <AmountContainer>
                {isMainWalletLoading && isTransferWalletLoading ? (
                  <span>-</span>
                ) : (
                  <DynamicFont
                    content={
                      mainSymbol +
                      Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance)
                    }
                  />
                )}
                <RefreshButton
                  width={"44px"}
                  height={"44px"}
                  iconUrl={refreshIcon}
                  onClick={fetchBalance}
                  $isLoading={isMainWalletLoading && isTransferWalletLoading}
                />
              </AmountContainer>
            </MainWalletContainer>
          </WalletsWrapper>
          <AccountNavigations />
        </>
      )}
    </PageContainer>
  );
};

export default AccountPage;

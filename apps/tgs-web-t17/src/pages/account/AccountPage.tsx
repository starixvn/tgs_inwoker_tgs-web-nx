import  { useEffect } from "react";
import DynamicFont from "react-dynamic-font";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useUpdatePageName, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useGameStore } from "@tgs-web-nx/core";
import styled from "styled-components";
import AccountNavigations from "./components/AccountNavigations";
import MemberCenterBorder from "./components/MemberCenterBorder";
import InfoCard from "@/pages/account/components/InfoCard";
import { PageContainer } from "@/components/styled-component/PageContainer";
import UserWalletInfo, {
  AmountContainer,
  MainAccountLabel,
  MainWalletContainer,
  RefreshButton,
  WalletsWrapper,
} from "@/components/project/UserWalletInfo";
import refreshIcon from "@/assets/t17/images/account/icon-refresh.svg";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

export const AccountPageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

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
  const { isDesktopSize, isMobileSize } = useRwd();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <AccountPageContainer>
      {isDesktopSize ? (
        <UserWalletInfo />
      ) : (
        <>
          <InfoCard />
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
        </>
      )}
      {isMobileSize && <MemberCenterBorder />}
      <AccountNavigations />
    </AccountPageContainer>
  );
};

export default AccountPage;

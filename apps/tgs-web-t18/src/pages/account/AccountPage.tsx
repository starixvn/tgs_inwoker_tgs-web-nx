import React, { useEffect, useMemo } from "react";
import DynamicFont from "react-dynamic-font";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuth, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useGameStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import accountImg from "@/assets/t18/images/account/icon_account.png";
import infoImg from "@/assets/t18/images/account/icon_info.png";
import { media } from "@/theme/breakpoints";
import Tabs, { TabItem } from "@/components/UI/Tabs";
import { useTab } from "@/hooks/account/useTab";
import InfoCard from "@/pages/account/components/InfoCard";
import AccountNavigations from "@/pages/account/components/AccountNavigations";
import MyInfo from "@/pages/account/components/MyInfo";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import UserWalletInfo, {
  AmountContainer,
  MainAccountLabel,
  MainWalletContainer,
  RefreshButton,
  WalletsWrapper,
} from "@/components/project/UserWalletInfo";
import refreshIcon from "@/assets/t18/images/account/icon-refresh.png";

const AccountContainer = styled.div`
  background: ${({ theme }) => theme.primaryDark};
  padding: 40px 15px 0;
  max-width: ${MAIN_CONTENT_MAX_WIDTH};
  margin: auto;

  & > div {
    margin-bottom: 15px;
  }

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const AccountIcon = () => {
  return <img src={accountImg} alt="account" />;
};

const InfoIcon = () => {
  return <img src={infoImg} alt="info" />;
};

const Mine = () => {
  const tabList = useMemo<TabItem[]>(() => {
    return [
      {
        label: i18n.t("TIGER.my"),
        value: "account",
        icon: <AccountIcon />,
      },
      { label: i18n.t("common.info"), value: "info", icon: <InfoIcon /> },
    ] as TabItem[];
  }, []);
  const { selectedTab, handleTabChange } = useTab(tabList);
  const { isLogin } = useAuth();
  const history = useHistory();
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

  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, []);

  return (
    <AccountContainer>
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
        </>
      )}

      <Tabs tabItemList={tabList} selectedTabItem={selectedTab} handleChange={handleTabChange} />

      {selectedTab.value === "account" && <AccountNavigations />}
      {selectedTab.value === "info" && <MyInfo />}
    </AccountContainer>
  );
};

export default Mine;

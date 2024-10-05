import Icon from "@/components/project/Icon";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { AccountIcon } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton } from "@/components/UI/Button";
import {
  AccountInfoIcon,
  DepositIcon,
  HistoryIcon,
  InboxIcon,
  LogoutIcon,
  TransactionIcon,
  WithdrawIcon,
} from "@/components/UI/CustomizeIcon";
import { SelectUnlitmitHeight } from "@/components/UI/SelectUnlimitHeight";
import { theme } from "@/theme";
import { MenuItem } from "@mui/material";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n, utility } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.balanceHeaderBackground};
  border-radius: 1.2rem;
  justify-content: space-between;
  padding-right: 0.2rem;
`;

const BalanceContainer = styled.div<{ $runAnim: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 0.8rem;
  height: 3.6rem;
  line-height: 1;
  padding: 1rem 0.6rem 1rem 3.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffc909;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    left: 0.8rem;
    width: 1.6rem;
    height: 1.6rem;
    background: url("/assets/images/common/icon-refresh.svg");
    animation: ${({ $runAnim }) => ($runAnim ? "rotation 1s linear forwards infinite" : "")};
  }

  @keyframes rotation {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

const AccountIconHeader = styled(AccountIcon)`
  border-width: 2px;
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const { mainSymbol, mainWalletBalance, transferWalletBalance, fetchMainWalletBalance, info } =
    useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const handleClickLogout = async () => {
    await handleLogout();
    //goToHomePage();
  };

  const [runAnimRefresh, setRunAnimRefresh] = useState<boolean>(false);
  let refreshTimeOut: NodeJS.Timeout;

  const handleRefreshBalance = () => {
    fetchMainWalletBalance();
    setRunAnimRefresh(true);
    refreshTimeOut && clearTimeout(refreshTimeOut);

    refreshTimeOut = setTimeout(() => {
      setRunAnimRefresh(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      refreshTimeOut && clearTimeout(refreshTimeOut);
    };
  }, []);

  const avatarUrl = utility.getAvatarUrl(info.playercode);

  return (
    <>
      <ButtonContainer>
        <BalanceContainer $runAnim={runAnimRefresh} onClick={handleRefreshBalance}>
          {currentBalance}
        </BalanceContainer>

        <GreenGradientButton
          style={{ minWidth: "unset", width: "3.6rem", height: "3.6rem" }}
          onClick={() => {
            history.push("/deposit");
          }}
        >
          <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
        </GreenGradientButton>
      </ButtonContainer>
      <SelectUnlitmitHeight
        renderValue={() => {
          return (
            <AccountIconHeader>
              <img src={avatarUrl} alt="avatar" />
            </AccountIconHeader>
          );
        }}
        value={""}
        sx={{
          border: "none",
          background: "transparent",
          "& .MuiSelect-select": {
            background: "transparent",
            padding: "0 !important",
          },
          "& .MuiSvgIcon-root": {
            display: "none",
          }       
        }}
        MenuProps={{
          classes: {

          }
        }}
       
      >
        <MenuItem
          onClick={() => {
            history.push("/deposit");
          }}
        >
          <DepositIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.2rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.2rem",
            }}
          ></DepositIcon>
          {i18n.t("common.deposit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/withdrawal");
          }}
        >
          <WithdrawIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.2rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.2rem",
            }}
          ></WithdrawIcon>
          {i18n.t("common.withdrawal")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push({
              pathname: "/transactions",
              state: { selectedType: 8 },
            });
          }}
        >
          <TransactionIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.4rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.5rem",
            }}
          ></TransactionIcon>
          {i18n.t("common.transactions")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/bet-history");
          }}
        >
          <HistoryIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.4rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.5rem",
            }}
          ></HistoryIcon>
          {i18n.t("common.bethistory")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/profile");
          }}
        >
          <AccountInfoIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.4rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.4rem",
            }}
          ></AccountInfoIcon>
          {i18n.t("deposit.details.account")}
        </MenuItem>
        <MenuItem onClick={() => {
            history.push("/inbox");
          }}>
          <InboxIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.2rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.6rem",
            }}
          ></InboxIcon>
          {i18n.t("wap.main.account.inbox")}
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>
          <LogoutIcon
            sx={{
              fill: `${theme.formInputPlaceHolderColor}`,
              fontSize: "2.2rem",
              marginRight: "0.6rem",
              position: "relative",
              top: "0.5rem",
            }}
          ></LogoutIcon>
          {i18n.t("common.logout")}
        </MenuItem>
      </SelectUnlitmitHeight>
      {isDesktopSize && <HeaderLanguageSwitch />}
    </>
  );
};

export default AccountHeaderContent;

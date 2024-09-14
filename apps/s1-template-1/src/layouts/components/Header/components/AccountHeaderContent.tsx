import Icon from "@/components/project/Icon";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { GreenGradientButton } from "@/components/UI/Button";
import {
  AccountInfoIcon,
  DepositIcon,
  HistoryIcon,
  LogoutIcon,
  TransactionIcon,
  WithdrawIcon,
} from "@/components/UI/CustomizeIcon";
import { Select } from "@/components/UI/Select";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { MenuItem } from "@mui/material";
import { useWalletStore } from "@tgs-web-nx/core";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 18rem;
  background-color: ${({ theme }) => theme.balanceHeaderBackground};
  border-radius: 1.2rem;
  justify-content: space-between;
  padding-right: 0.2rem;
`;

const BascicButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 36px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  flex-shrink: 0;
`;

const BalanceContainer = styled(BascicButton)`
  cursor: unset;
  width: calc(100% - 3.8rem);
  padding: 1rem 0.6rem;
  justify-content: flex-end;
  color: #ffc909;
`;

const WithDrawButton = styled(BascicButton)`
  background: ${({ theme }) => theme.memberSection};
  color: ${({ theme }) => theme.lightPurple};
  border: ${({ theme }) => `1px solid ${theme.lightPurple}`};
`;

const DepositButton = styled.div`
  color: ${({ theme }) => theme.text};
  margin-right: 0.1rem;
`;

const LogoutButton = styled(BascicButton)`
  background: ${({ theme }) => theme.inputBGC};
  color: ${({ theme }) => theme.text};
  gap: 4px;
`;

const AccountIcon = styled.div`
  cursor: pointer;
  margin: 0 0 0 0.6rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.2);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.sm} {
    margin: 0 0.8rem 0 0.6rem;
  }
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const goToHomePage = useGoToHomePage();
  const { isLargeDesktopSize, isDesktopSize, isMobileSize } = useRwd();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <>
      <ButtonContainer>
        <BalanceContainer>{currentBalance}</BalanceContainer>

        <GreenGradientButton
          style={{ minWidth: "unset", width: "3.6rem", height: "3.6rem" }}
          onClick={() => {
            history.push("/deposit");
          }}
        >
          <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
        </GreenGradientButton>
        
      </ButtonContainer>
      <Select
        renderValue={() => {
          return (
            <AccountIcon>
              <img
                src={"/assets/images/common/avatar.png"}
                width={"36px"}
                height={"36px"}
                alt="profile"
              />
            </AccountIcon>
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
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              ".MuiList-root": {
                padding: "0",
                color: theme.formInputColor,
              },
              "& .MuiMenuItem-root": {
                color: theme.formInputColor,
              },
              "& .Mui-selected": {
                background: `${theme.dropDownItemSelectedBackground} !important`,
                "&:hover": {
                  background: `${theme.dropDownItemSelectedBackground} !important`,
                },
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            history.push("/withdrawal");
          }}
        >
          <WithdrawIcon
            sx={{
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
            }}
          ></WithdrawIcon>
          {i18n.t("common.withdraw")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/deposit");
          }}
        >
          <DepositIcon
            sx={{
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
            }}
          ></DepositIcon>
          {i18n.t("common.deposit")}
        </MenuItem>
        <MenuItem>
          <TransactionIcon
            sx={{
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
            }}
          ></TransactionIcon>
          {i18n.t("common.translation")}
        </MenuItem>
        <MenuItem>
          <HistoryIcon
            sx={{
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
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
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
            }}
          ></AccountInfoIcon>
          {i18n.t("common.accountinfo")}
        </MenuItem>
        <MenuItem onClick={handleClickLogout}>
          <LogoutIcon
            sx={{
              fill: `${theme.formInputColor}`,
              width: "18px",
              height: "18px",
              marginRight: "6px",
              position: "relative",
              top: "2px",
            }}
          ></LogoutIcon>
          {i18n.t("common.logout")}
        </MenuItem>
      </Select>
      {isDesktopSize && <HeaderLanguageSwitch />}
    </>
  );
};

export default AccountHeaderContent;

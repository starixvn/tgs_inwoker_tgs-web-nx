import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Menu, MenuItem } from "@mui/material";
import { NavCardKey } from "@tgs-web-nx/types";
import Icon from "@/components/project/Icon";
import iconAccount from "@/assets/t26/images/header/icon-account.svg";
import iconBalance from "@/assets/t26/images/header/icon-balance.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import {
  PrimaryButton,
  SecondaryButton,
} from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import {
  ProfileIcon,
  AffiliateIcon,
  ContactIcon,
  DepositIcon,
  DownloadIcon,
  InoboxIcon,
  ReportIcon,
  TransferIcon,
  WithdrawIcon,
  VipIcon,
  LogourIcon,
} from "@/components/account/Icons";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 36px;
  border: ${({ theme }) => `1px solid ${theme.darkGray}`};
  border-radius: 10px;
  cursor: pointer;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => `1px solid ${theme.darkGray}`};
  border-radius: 10px;
  padding: 10px 6px;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  gap: 10px;
`;
type IconProps = {
  $color: string;
};

type NavItem = {
  key: NavCardKey | string;
  Icon: React.FC<IconProps>;
  label: string;
  router?: string;
  routePath?: string;
} & (
  | {
      navType: "route";
      routePath: string;
    }
  | {
      navType: "action";
      callback: () => void;
    }
);

const AccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const NavItemList: NavItem[] = [
    {
      key: NavCardKey.PROFILE,
      label: i18n.t("wap.main.my"),
      Icon: ProfileIcon,
      navType: "route",
      routePath: "/profile",
    },
    {
      key: NavCardKey.DEPOSIT,

      label: i18n.t("common.deposit"),
      Icon: DepositIcon,
      navType: "route",
      routePath: "/deposit",
    },
    {
      key: NavCardKey.WITHDRAW,
      label: i18n.t("common.withdrawal"),
      Icon: WithdrawIcon,
      navType: "route",
      routePath: "/withdrawal",
    },
    {
      key: NavCardKey.TRANSFER,
      label: i18n.t("common.transfer"),
      Icon: TransferIcon,
      navType: "route",
      routePath: "/transfer",
    },
    {
      key: NavCardKey.REPORT,
      label: i18n.t("report.title"),
      Icon: ReportIcon,
      navType: "route",
      routePath: "/report",
    },
    {
      key: NavCardKey.INBOX,
      label: i18n.t("wap.main.account.inbox"),
      Icon: InoboxIcon,
      navType: "route",
      routePath: "/inbox",
    },
    {
      key: NavCardKey.AFFILIATE,
      label: i18n.t("wap.main.account.affiliate"),
      Icon: AffiliateIcon,
      navType: "route",
      routePath: "/affiliate",
    },
    {
      key: NavCardKey.VIP,
      label: "VIP",
      Icon: VipIcon,
      navType: "route",
      routePath: "/vip",
    },
    {
      key: NavCardKey.CONTACT_US,
      label: i18n.t("common.contact"),
      Icon: ContactIcon,
      navType: "route",
      routePath: "/support",
    },
    {
      key: NavCardKey.APP_DOWNLOAD,
      label: i18n.t("wap.main.account.appDownload"),
      Icon: DownloadIcon,
      navType: "route",
      routePath: "/appDownload",
    },
    {
      key: NavCardKey.LOGOUT,
      label: i18n.t("web.header.logout"),
      Icon: LogourIcon,
      navType: "action",
      callback: () => {
        handleLogout();
      },
    },
  ];
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [activeNavitem, setActiveNavitem] = useState<NavCardKey | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleClickNavItem = (navItem: NavItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        handleCloseAccountMenu();
        break;

      case "action":
        navItem.callback();
        handleCloseAccountMenu();
    }
  };
  return (
    <ButtonContainer>
      <BalanceContainer>
        <Icon iconUrl={iconBalance} width={"20px"} height={"25px"} />
        <span>{currentBalance}</span>
      </BalanceContainer>
      <PrimaryButton
        onClick={() => {
          history.push("/withdrawal");
        }}
      >
        {i18n.t("common.withdrawal")}
      </PrimaryButton>
      <SecondaryButton
        onClick={() => {
          history.push("/deposit");
        }}
      >
        {i18n.t("common.deposit")}
      </SecondaryButton>
      {isDesktopSize && (
        <>
          <ProfileContainer onClick={handleClick}>
            <Icon iconUrl={iconAccount} width={"20px"} height={"25px"} />
          </ProfileContainer>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: theme.mainBackground,
              },
            }}
          >
            {NavItemList.map((item: NavItem, index) => {
              return (
                <MenuItem
                  key={item.key}
                  style={{
                    height: "58px",
                    display: "flex",
                    gap: "10px",
                    padding: "0px 16px 0px 34px",
                    color: activeNavitem === item.key ? theme.primary : theme.text,
                    borderTop: index === NavItemList.length - 1 ? `1px solid #F2F2F2` : "none",
                  }}
                  onClick={() => handleClickNavItem(item)}
                  onMouseEnter={() => {
                    setActiveNavitem(item.key as NavCardKey);
                  }}
                  onMouseLeave={() => {
                    setActiveNavitem(null);
                  }}
                >
                  <item.Icon $color={activeNavitem === item.key ? theme.primary : theme.white} />
                  <div>{item.label}</div>
                </MenuItem>
              );
            })}
          </Menu>
          <HeaderLanguageSwitch />
        </>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;

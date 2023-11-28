import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { NavCardKey } from "@tgs-web-nx/types";
import BalanceWithRefresh from "../BalanceWithRefresh/index";

import closeImg from "@/assets/t31/images/account/Close.png";
import VipMedal from "@/components/project/VipMedal";
import Icon from "@/components/project/Icon";

import accountImg from "@/assets/t31/images/account/navItem/mobile/Member.png";
import depositImg from "@/assets/t31/images/account/navItem/mobile/Deposit.png";
import withdrawImg from "@/assets/t31/images/account/navItem/mobile/Withdraw.png";
import transferImg from "@/assets/t31/images/account/navItem/mobile/Transfer.png";
import vipImg from "@/assets/t31/images/account/navItem/mobile/VIP.png";
import reportImg from "@/assets/t31/images/account/navItem/mobile/Report.png";
import inboxImg from "@/assets/t31/images/account/navItem/mobile/Inbox.png";
import affiliateImg from "@/assets/t31/images/account/navItem/mobile/Affiliate.png";
import contactImg from "@/assets/t31/images/account/navItem/mobile/Contact Us.png";
import downloadImg from "@/assets/t31/images/account/navItem/mobile/Download.png";
import logoutImg from "@/assets/t31/images/account/navItem/mobile/Log out.png";

const AccountMenusContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
`;

const AccountMenuHeader = styled.div`
  background: ${({ theme }) => theme.navbar};
  display: flex;
  justify-content: space-between;
  padding: 10px;
  & > p {
    font-family: SF Pro;
    font-size: 20px;
    font-weight: 590;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: ${({ theme }) => theme.activeNav};
  }
  & > img {
    width: 24px;
    height: 24px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: ${({ theme }) => theme.black30};
`;

const VIPLevelInfo = styled.div`
  gap: 12px;
  display: flex;
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LevelText = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.yellow};
`;

const UserName = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.white};
`;

const NavCardContainer = styled.div`
  cursor: pointer;
  height: 44px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
  padding: 0 12px;
  color: ${({ theme }) => theme.iconLable};
  border-bottom: 1px solid ${({ theme }) => theme.white30};

  & > div:first-child {
    margin-right: 10px;
  }
  & > span {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: ${({ theme }) => theme.white};
  }
`;

const AccountNavigations = () => {
  const { account } = useAccountStore();
  const { handleLogout } = useAuth();

  const history = useHistory();
  const accountLevel = account.info.member_level_id;
  const username = account.info.member_username;

  const handleClick = useCallback((item: MenuItem) => {
    switch (item.navType) {
      case "route":
        history.push(item.routePath);
        break;

      case "action":
        item.callback();
    }
  }, []);
  type MenuItem = {
    key: NavCardKey;
    label: string | any;
    iconUrl: string;
    iconSecondaryUrl?: string;
    isHide?: boolean;
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
  const nemuList: MenuItem[] = useMemo(() => {
    return [
      {
        key: NavCardKey.PROFILE,
        navType: "route",
        label: i18n.t("wap.main.my"),
        iconUrl: accountImg,
        routePath: "/profile",
      },
      {
        key: NavCardKey.DEPOSIT,
        navType: "route",
        label: i18n.t("common.deposit"),
        iconUrl: depositImg,
        routePath: "/deposit",
      },
      {
        key: NavCardKey.WITHDRAW,
        navType: "route",
        label: i18n.t("common.withdrawal"),
        iconUrl: withdrawImg,
        routePath: "/withdrawal",
      },
      {
        key: NavCardKey.TRANSFER,
        navType: "route",
        label: i18n.t("common.transfer"),
        iconUrl: transferImg,
        routePath: "/transfer",
      },

      {
        key: NavCardKey.VIP,
        navType: "route",
        label: "VIP",
        iconUrl: vipImg,
        routePath: "/vip",
      },
      {
        key: NavCardKey.REPORT,
        navType: "route",
        label: i18n.t("report.title"),
        iconUrl: reportImg,
        routePath: "/report",
      },
      {
        key: NavCardKey.MESSAGE_CENTER,
        navType: "route",
        label: i18n.t("wap.main.account.inbox"),
        iconUrl: inboxImg,
        routePath: "/message-center",
      },
      {
        key: NavCardKey.AFFILIATE,
        navType: "route",
        label: i18n.t("wap.main.account.affiliate"),
        iconUrl: affiliateImg,
        routePath: "/affiliate",
      },
      {
        key: NavCardKey.CONTACT_US,
        navType: "route",
        label: i18n.t("common.contact"),
        iconUrl: contactImg,
        routePath: "/support",
      },
      {
        key: NavCardKey.APP_DOWNLOAD,
        navType: "route",
        label: i18n.t("wap.main.account.appDownload"),
        iconUrl: downloadImg,
        routePath: "/appDownload",
      },
      {
        key: NavCardKey.LOGOUT,
        navType: "action",
        label: i18n.t("web.header.logout"),
        iconUrl: logoutImg,
        callback: () => {
          handleLogout();
        },
      },
    ] as MenuItem[];
  }, []);
  return (
    <AccountMenusContainer>
      <AccountMenuHeader>
        <p>{i18n.t("deposit.details.account")}</p>
        <img
          alt="close"
          src={closeImg}
          onClick={() => {
            history.push("/");
          }}
        ></img>
      </AccountMenuHeader>
      <UserInfoContainer>
        <VIPLevelInfo>
          <VipMedal vipLevel={accountLevel} />
          <LevelContainer>
            <LevelText>{`VIP ${accountLevel}`}</LevelText>
            <UserName>{username}</UserName>
          </LevelContainer>
        </VIPLevelInfo>
        <BalanceWithRefresh />
      </UserInfoContainer>
      {nemuList.map((item) => {
        return (
          <NavCardContainer key={item.key} onClick={() => handleClick(item)}>
            <Icon iconUrl={item.iconUrl} width={"24px"} height={"24px"} />
            <span>{item.label}</span>
          </NavCardContainer>
        );
      })}
    </AccountMenusContainer>
  );
};

export default React.memo(AccountNavigations);

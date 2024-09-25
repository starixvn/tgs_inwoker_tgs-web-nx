import { NavCardKey } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { theme } from "@/theme";
import {
  AccountInfoIcon,
  DepositIcon,
  HistoryIcon,
  InboxIcon,
  TransactionIcon,
  WithdrawIcon,
} from "@/components/UI/CustomizeIcon";

type MenuItem = {
  key: NavCardKey;
  label: string;
  router: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  viewBox?: string;
  fontSizeIcon?: string;
};

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1.6rem;
  width: 100%;
  overflow: auto;
`;

const Tab = styled.div<{ $isActived: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme, $isActived }) =>
    $isActived ? `${theme.tabActiveTextColor}` : `${theme.tabTextColor}`};
  padding: 1rem;
  border-radius: 8px;
  border: ${({ theme, $isActived }) =>
    $isActived ? `1px solid ${theme.borderTabActive}` : `1px solid ${theme.borderTab}`};
  gap: 4px;
  margin-bottom: 16px;
  cursor: pointer;
  justify-content: flex-end;
  & span {
    font-size: 14px;
    font-weight: 590;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: ${({ theme, $isActived }) =>
      $isActived ? `1px solid ${theme.tabActiveTextColor}` : `1px solid ${theme.tabTextColor}`};
  }
  & svg {
    flex-shrink: 0;
  }
  background: ${({ theme }) => theme.tabBackground};
`;

const MenuTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const accountMenuList: MenuItem[] = [
    {
      key: NavCardKey.DEPOSIT,
      label: i18n.t("common.deposit"),
      router: "/deposit",
      icon: DepositIcon,
      viewBox: "0 0 18 20",
      fontSizeIcon: "2.4rem",
    },
    {
      key: NavCardKey.WITHDRAW,
      label: i18n.t("common.withdrawal"),
      router: "/withdrawal",
      icon: WithdrawIcon,
      viewBox: "0 0 18 20",
      fontSizeIcon: "2.4rem",
    },
    //TODO: remove for phase 1
    // {
    //   key: NavCardKey.WAGERING,
    //   label: i18n.t("common.wagering"),
    //   router: "/wagering",
    //   icon: ReportIcon,
    // },
    {
      key: NavCardKey.TRANSFER,
      label: i18n.t("common.transactions"),
      router: "/transactions",
      icon: TransactionIcon,
      viewBox: "0 0 18 14",
      fontSizeIcon: "2.6rem",
    },
    {
      key: NavCardKey.REPORT,
      label: i18n.t("common.bethistory"),
      router: "/bet-history",
      icon: HistoryIcon,
      viewBox: "0 0 14 16",
      fontSizeIcon: "2.3rem",
    },
    {
      key: NavCardKey.PROFILE,
      label: i18n.t("deposit.details.account"),
      router: "/profile",
      icon: AccountInfoIcon,
      viewBox: "0 0 12 15",
      fontSizeIcon: "2.2rem",
    },
    {
      key: NavCardKey.INBOX,
      label: i18n.t("wap.main.account.inbox"),
      router: "/inbox",
      icon: InboxIcon,
      viewBox: "0 0 16 10",
      fontSizeIcon: "2.2rem",
    },
    //TODO: remove for phase 1
    // {
    //   key: NavCardKey.AFFILIATE,
    //   label: i18n.t("wap.main.account.affiliate"),
    //   router: "/affiliate",
    //   icon: AffiliateIcon,
    // },

    //TODO: remove for phase 1
    // {
    //   key: NavCardKey.APP_DOWNLOAD,
    //   label: i18n.t("wap.main.account.appDownload"),
    //   router: "/appDownload",
    //   icon: DownloadIcon,
    // },
  ];
  return (
    <TabContainer>
      {accountMenuList.map((item: MenuItem) => {
        const isActived = item.router === location.pathname;
        return (
          <Tab
            key={item.key}
            $isActived={isActived}
            onClick={() => {
              history.push(item.router);
            }}
          >
            <item.icon
              sx={{
                fontSize: item.fontSizeIcon,
                color: theme.text,
                filter: "drop-shadow(0 0 0.4rem rgba(255, 255, 255, 0.50))",
              }}
              viewBox={item.viewBox}
            />
            <span>{item.label}</span>
          </Tab>
        );
      })}
    </TabContainer>
  );
};

export default MenuTabs;

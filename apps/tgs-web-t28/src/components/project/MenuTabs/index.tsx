import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { NavCardKey } from "@tgs-web-nx/types";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
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
} from "@/components/account/Icons";

type MenuItem = {
  key: NavCardKey;
  label: string;
  router: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  overflow: auto;
`;

const Tab = styled.div<{ $isActived: boolean }>`
  display: flex;
  align-items: center;
  color: white;
  height: 44px;
  padding: 8px 14px;
  border-radius: 30px;
  border: ${({ theme, $isActived }) =>
    $isActived ? `1px solid ${theme.lightPurple}` : `2px solid ${theme.secBTNBGC}`};
  gap: 8px;
  margin-bottom: 24px;
  cursor: pointer;
  & span {
    font-size: 14px;
    font-weight: 590;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: ${({ theme, $isActived }) => ($isActived ? theme.lightPurple : theme.gray50)};
  }
  & svg {
    flex-shrink: 0;
  }
`;

const MenuTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const accountMenuList: MenuItem[] = [
    {
      key: NavCardKey.PROFILE,
      label: i18n.t("deposit.details.account"),
      router: "/profile",
      icon: ProfileIcon,
    },
    {
      key: NavCardKey.DEPOSIT,
      label: i18n.t("common.deposit"),
      router: "/deposit",
      icon: DepositIcon,
    },
    {
      key: NavCardKey.WITHDRAW,
      label: i18n.t("common.withdrawal"),
      router: "/withdrawal",
      icon: WithdrawIcon,
    },
    {
      key: NavCardKey.WAGERING,
      label: i18n.t("common.wagering"),
      router: "/wagering",
      icon: ReportIcon,
    },
    {
      key: NavCardKey.TRANSFER,
      label: i18n.t("common.transfer"),
      router: "/transfer",
      icon: TransferIcon,
    },
    {
      key: NavCardKey.REPORT,
      label: i18n.t("report.title"),
      router: "/report",
      icon: ReportIcon,
    },
    {
      key: NavCardKey.INBOX,
      label: i18n.t("wap.main.account.inbox"),
      router: "/inbox",
      icon: InoboxIcon,
    },
    {
      key: NavCardKey.AFFILIATE,
      label: i18n.t("wap.main.account.affiliate"),
      router: "/affiliate",
      icon: AffiliateIcon,
    },
    {
      key: NavCardKey.CONTACT_US,
      label: i18n.t("common.contact"),
      router: "/support",
      icon: ContactIcon,
    },
    {
      key: NavCardKey.APP_DOWNLOAD,
      label: i18n.t("wap.main.account.appDownload"),
      router: "/appDownload",
      icon: DownloadIcon,
    },
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
            <item.icon $color={isActived ? theme.lightPurple : theme.gray50} />
            <span>{item.label}</span>
          </Tab>
        );
      })}
    </TabContainer>
  );
};

export default MenuTabs;

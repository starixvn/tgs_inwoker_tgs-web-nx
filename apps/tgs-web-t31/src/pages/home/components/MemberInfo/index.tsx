import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { Common } from "@tgs-web-nx/utils";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import VipMedal from "@/components/project/VipMedal";
import depositImg from "@/assets/t31/images/account/Deposit.png";
import withdrawImg from "@/assets/t31/images/account/Withdraw.png";
import transferImg from "@/assets/t31/images/account/Transfer.png";

const MemberContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.navbar};
  padding: 4px;
  border-radius: 6px;
  gap: 4px;
`;

const MemberHeader = styled.div`
  height: 36px;
  padding: 0 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.iconLable};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const GreetingText = styled.div`
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.activeNav};
`;
const UserName = styled.div`
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.yellow};
`;

const VIPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.yellow};
  border-left: 1px solid ${({ theme }) => theme.white30};
  padding-left: 10px;
`;

const LevelContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
`;

const MemberContent = styled.div`
  padding: 0 12px;
  gap: 24px;
  display: flex;
  height: 78px;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  gap: 10px;
  border-right: 1px solid ${({ theme }) => theme.priBTNOutline};
  & span {
    color: ${({ theme }) => theme.white};
  }
`;

const BalanceAmount = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.yellow};
`;

const NavItemContainer = styled.div`
  display: flex;
  gap: 47px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  & span {
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
  }
`;
const NavImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemberInfo = () => {
  const { wallet } = useWalletStore();
  const { account } = useAccountStore();
  const accountLevel = account.info.member_level_id;
  const username = account.info.member_username;
  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;
  const history = useHistory();
  enum NavCardKey {
    DEPOSIT,
    WITHDRAW,
    TRANSFER,
  }
  type NavItem = {
    key: NavCardKey;
    label: string | any;
    iconUrl: string;
    routePath: string;
  };
  const navItemList: NavItem[] = [
    {
      key: NavCardKey.DEPOSIT,
      label: i18n.t("common.deposit"),
      iconUrl: depositImg,
      routePath: "/deposit",
    },
    {
      key: NavCardKey.WITHDRAW,
      label: i18n.t("common.withdrawal"),
      iconUrl: withdrawImg,
      routePath: "/withdrawal",
    },
    {
      key: NavCardKey.TRANSFER,
      label: i18n.t("common.transfer"),
      iconUrl: transferImg,
      routePath: "/transfer",
    },
  ];
  return (
    <MemberContainer>
      <MemberHeader>
        <UserContainer>
          <GreetingText>Hello</GreetingText>
          <UserName>{username}</UserName>
        </UserContainer>
        <VIPContainer>
          <LevelContainer>{`VIP ${accountLevel}`}</LevelContainer>
          <VipMedal vipLevel={accountLevel} />
        </VIPContainer>
      </MemberHeader>
      <MemberContent>
        <BalanceContainer>
          <span>{i18n.t("wap.main.account.totalFund")}</span>
          <BalanceAmount>{currentBalance}</BalanceAmount>
        </BalanceContainer>
        <NavItemContainer>
          {navItemList.map((navItem) => {
            return (
              <NavItem
                key={navItem.key}
                onClick={() => {
                  history.push(navItem.routePath);
                }}
              >
                <NavImage>
                  <img width={30} src={navItem.iconUrl}></img>
                </NavImage>
                <span>{navItem.label}</span>
              </NavItem>
            );
          })}
        </NavItemContainer>
      </MemberContent>
    </MemberContainer>
  );
};

export default MemberInfo;

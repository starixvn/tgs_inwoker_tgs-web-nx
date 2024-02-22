import { useCallback } from "react";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import memberImg from "@/assets/t31/images/header/Member.svg";
import RefreshButton from "@/components/project/BalanceTracker/components/RefreshButton";

const UserInfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const GreetingText = styled.div`
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.white};
  justify-content: center;
  align-items: center;
  align-self: center;
`;
const BalanceText = styled(GreetingText)``;

const UserName = styled.div`
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.yellow};
`;
const BalanceAmount = styled(UserName)`
  margin-right: 4px;
`;

const BalanceContainer = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
`;

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 12px;
`;
const UserInfo = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet, getBalanceList } = useWalletStore();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const username = account.info.member_username;

  const handleRefreshBalance = useCallback(async () => {
    await getBalanceList();
  }, [getBalanceList]);

  return (
    <UserInfoContainer>
      <GreetingText>Hello,</GreetingText>
      <UserName>{username}</UserName>
      <BalanceContainer>
        <BalanceText>{i18n.t("web.account.header.total")}: </BalanceText>
        <BalanceAmount>{currentBalance}</BalanceAmount>
        <RefreshButton handleClick={() => handleRefreshBalance()} />
      </BalanceContainer>
      <MemberContainer
        onClick={() => {
          history.push("/profile");
        }}
      >
        <img src={memberImg} width={25} height={25} alt="memeber" />
      </MemberContainer>
    </UserInfoContainer>
  );
};
export default UserInfo;

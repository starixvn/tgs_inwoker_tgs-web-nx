import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useHistory } from "react-router";
import styled from "styled-components";
import memberImg from "@/assets/t31/images/header/Member.svg";
import refreshImg from "@/assets/t31/images/header/Refresh.svg";

const UserInfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const GreetingText = styled.div`
  font-size: 12px;
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
  font-size: 12px;
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
`;
const UserInfo = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();

  const currentBalance = `${Common.formatNumberWithThousand(wallet.mainBalance)}`;
  const username = account.info.member_username;

  return (
    <UserInfoContainer>
      <GreetingText>Hello,</GreetingText>
      <UserName>{username}</UserName>
      <BalanceContainer>
        <BalanceText>{i18n.t("web.account.header.total")}: </BalanceText>
        <BalanceAmount>{currentBalance}</BalanceAmount>
        {/* todo: refresh action */}
        <img src={refreshImg} width={20} height={20} alt="refresh" />
      </BalanceContainer>
      <MemberContainer>
        <img src={memberImg} width={20} height={20} alt="memeber" />
      </MemberContainer>
    </UserInfoContainer>
  );
};
export default UserInfo;

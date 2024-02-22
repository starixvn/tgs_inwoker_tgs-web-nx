import styled from "styled-components";
import { useState } from "react";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import Icon from "@/components/project/Icon";
import iconEyeOpen from "@/assets/t22/images/header/eyeOpen.svg";
import iconEyeClose from "@/assets/t22/images/header/eyeClose.svg";
import iconLogout from "@/assets/t22/images/header/logout.svg";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 200px;
`;

const UsernameContainer = styled.div`
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.labelText};
  cursor: pointer;
`;

const Box = styled.div`
  max-width: 200px;
`;

const Balance = styled(UsernameContainer)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
`;

const BalanceAmount = styled.span`
  background: none;
  border: none;
  color: ${({ theme }) => theme.labelText};
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Logout = styled(UsernameContainer)`
  min-width: 20px;
`;

const AccountHeaderContent = () => {
  const { account } = useAccountStore();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const goToHomePage = useGoToHomePage();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();
  const [isShowBalance, setIsShowBalance] = useState(true);

  const currentBalance =
  mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);  const username = account.info.member_username;
  
  // 金額顯示切換
  const prefix = '$ ';
  const visibleBalance = `${prefix}${currentBalance}`;
  const hideBalance = prefix.padEnd(visibleBalance.length, '*');
  const balanceAmount = isShowBalance ? visibleBalance : hideBalance;
  const iconUrl = isShowBalance ? iconEyeOpen : iconEyeClose;

  const handleShowBalance = () => {
    setIsShowBalance(prev => !prev);
  }


  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <ButtonContainer>
      <Box>
        <UsernameContainer>{username}</UsernameContainer>

        <Balance>
          <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} onClick={handleShowBalance} />
          <BalanceAmount>{balanceAmount}</BalanceAmount>
        </Balance>
      </Box>
      
      <Logout onClick={handleClickLogout}>
        <img src={iconLogout} alt="logout" />
      </Logout>
    </ButtonContainer>
  );
};

export default AccountHeaderContent;

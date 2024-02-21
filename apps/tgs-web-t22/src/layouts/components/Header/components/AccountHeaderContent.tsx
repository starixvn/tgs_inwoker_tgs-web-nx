import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore, useWalletStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import Icon from "@/components/project/Icon";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import iconRefresh from "@/assets/t22/images/header/refresh.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UsernameContainer = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 16px;
  color: ${({ theme }) => theme.black};
  cursor: pointer;
`;

const SeparatorLine = styled.span`
  background: ${({ theme }) => theme.black};
  width: 1px;
  height: 16px;
`;

const Balance = styled(UsernameContainer)`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const Logout = styled(UsernameContainer)``;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { wallet, getWalletBalance } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const { isLargeDesktopSize } = useRwd();
  const goToHomePage = useGoToHomePage();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);

  const username = account.info.member_username;

  const handleGoToProfile = () => {
    history.push("/profile");
  };

  const handleGoToInbox = () => {
    history.push("/inbox");
  };

  const handleGoToAccount = () => {
    history.push("/account");
  };

  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <ButtonContainer>
      <UsernameContainer onClick={handleGoToAccount}>{username}</UsernameContainer>

      <SeparatorLine />

      <Balance onClick={getWalletBalance}>
        {isLargeDesktopSize && `${i18n.t("web.header.mainAccount")}: `}${currentBalance}
        <Icon iconUrl={iconRefresh} width={"20px"} height={"20px"} />
      </Balance>

      <TransferButtonGroup />

      <Logout onClick={handleClickLogout}>{i18n.t("web.header.logout")}</Logout>

      <HeaderLanguageSwitch />
    </ButtonContainer>
  );
};

export default AccountHeaderContent;

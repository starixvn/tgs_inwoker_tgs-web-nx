import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAccountStore } from "@tgs-web-nx/core";
import { Common } from "@tgs-web-nx/utils";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGoToHomePage } from "@tgs-web-nx/core/hooks";
import config, { brandConfig, BrandName } from "@tgs-web-nx/config";
import Icon from "@/components/project/Icon";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import iconAccount from "@/assets/t29/images/header/icon-account.svg";
import iconInbox from "@/assets/t29/images/header/icon-inbox.svg";
import iconInboxBlue from "@/assets/t29/images/header/icon-inbox-blue.svg";
import iconLogout from "@/assets/t29/images/header/icon-logout.svg";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { media } from "@/theme/breakpoints";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UsernameContainer = styled.div`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};

  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const InboxIconContainer = styled.div`
  cursor: pointer;
`;

const Balance = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 0.875rem;
  font-weight: 400;

  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const AccountHeaderContent = () => {
  const history = useHistory();
  const { account } = useAccountStore();
  const { handleLogout } = useAuthContext();
  const { isDesktopSize } = useRwd();
  const goToHomePage = useGoToHomePage();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();
  const currentBalance =
    mainSymbol + Common.formatCurrency(mainWalletBalance + transferWalletBalance);
  const username = account.info.member_username;

  const handleGoToProfile = () => {
    history.push("/profile");
  };

  const handleGoToInbox = () => {
    history.push("/inbox");
  };
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <ButtonContainer>
      <UsernameContainer onClick={() => history.push("/account")}>{username}</UsernameContainer>
      <Balance>${currentBalance}</Balance>

      {isDesktopSize && <TransferButtonGroup />}

      {isDesktopSize && <HeaderLanguageSwitch />}

      {isDesktopSize ? (
        <>
          <InboxIconContainer onClick={handleGoToProfile}>
            <Icon iconUrl={iconAccount} width={"20px"} height={"20px"} />
          </InboxIconContainer>

          <InboxIconContainer onClick={handleGoToInbox}>
            <Icon iconUrl={iconInbox} width={"20px"} height={"20px"} />
          </InboxIconContainer>

          <InboxIconContainer onClick={handleClickLogout}>
            <Icon iconUrl={iconLogout} width={"20px"} height={"20px"} />
          </InboxIconContainer>
        </>
      ) : (
        <InboxIconContainer onClick={handleGoToInbox}>
          <Icon iconUrl={iconInboxBlue} width={"24px"} height={"24px"} />
        </InboxIconContainer>
      )}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;

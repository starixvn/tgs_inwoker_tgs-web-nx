import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { media } from "@/theme/breakpoints";
import BalanceButton from "@/layouts/components/Header/components/BalanceButton";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";

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
  const { isDesktopSize } = useRwd();

  const goToDeposit = () => {
    history.push("/deposit");
  };

  return (
    <ButtonContainer>
      <BalanceButton />
      {/*TODO: Header is too small to contain this Deposit button*/}
      {/*<RoundHeaderButton*/}
      {/*  onClick={goToDeposit}*/}
      {/*  style={{*/}
      {/*    color: theme.black02,*/}
      {/*    background: theme.primary,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {i18n.t("common.deposit")}*/}
      {/*</RoundHeaderButton>*/}
      <HeaderLanguageSwitch />

      {!isDesktopSize && <ContextMenuButton />}

      {isDesktopSize && <TransferButtonGroup />}

      {isDesktopSize && <HeaderLanguageSwitch />}

      {/*{isDesktopSize ? (*/}
      {/*  <>*/}
      {/*    <InboxIconContainer onClick={handleGoToProfile}>*/}
      {/*      <Icon iconUrl={iconAccount} width={"20px"} height={"20px"} />*/}
      {/*    </InboxIconContainer>*/}

      {/*    <InboxIconContainer onClick={handleGoToInbox}>*/}
      {/*      <Icon iconUrl={iconInbox} width={"20px"} height={"20px"} />*/}
      {/*    </InboxIconContainer>*/}

      {/*    <InboxIconContainer onClick={handleClickLogout}>*/}
      {/*      <Icon iconUrl={iconLogout} width={"20px"} height={"20px"} />*/}
      {/*    </InboxIconContainer>*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <InboxIconContainer onClick={handleGoToInbox}>*/}
      {/*    <Icon iconUrl={iconInboxBlue} width={"24px"} height={"24px"} />*/}
      {/*  </InboxIconContainer>*/}
      {/*)}*/}
    </ButtonContainer>
  );
};

export default AccountHeaderContent;

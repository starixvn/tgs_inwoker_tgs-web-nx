import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useAuth, useAuthContext, useHeader } from "@tgs-web-nx/core/features";
import TransferButtonGroup from "@/layouts/components/Header/components/TransferButtonGroup";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import BalanceButton from "@/layouts/components/Header/components/BalanceButton";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import ContextMenuButton from "@/layouts/components/Header/components/ContextMenuButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
`;

const AccountHeaderContent = () => {
  const { isDesktopSize } = useRwd();
  const { handleLogout } = useAuthContext();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const {} = useAuth();

  const handleClickLogout = async () => {
    if (!isDesktopSize && isMenuOpen) {
      handleToggleMenu(false);
    }
    await handleLogout();
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
      {<TransferButtonGroup />}
      <HeaderLanguageSwitch />

      {<ContextMenuButton />}

      {isDesktopSize && (
        <HeaderButton
          color={"primary"}
          onClick={handleClickLogout}
          style={{
            background: theme.grey06,
            color: theme.grey02,
            height: "100%",
          }}
        >
          <>{i18n.t("web.header.logout")}</>
        </HeaderButton>
      )}

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
